// class parserHtml{

// }
const Tokenizer = require('css-selector-tokenizer');
const _ =require('lodash')

const css = require('css');
const EOF = Symbol('EOF');

const layout = require('./layout.js')

// export default parserHtml
let currentToken = null;
let currentAttribute = null;

let stack = [{type: 'document', children: []}]
let currentTextNode = null

// 把css规则暂存到一个数组里
let rules = []
function addCSSRules(text) {
  var ast = css.parse(text)
  // console.log(JSON.stringify(ast, null, "   "))
  rules.push(...ast.stylesheet.rules)
}

// function match(element, selector) {
//   if (!selector || !element.attributes)
//     return false;

//   if (selector.charAt(0) == '#') {
//     var attr = element.attributes.filter(attr => attr.name === 'id')[0]
//     if(attr && attr.value === selector.replace('#',''))
//       return true;
//   } else if (selector.charAt(0) == '.') {
//     // 1. 实现复合选择器
//     // 2. 补全空格的class 逻辑 class = 'item active'
//     var attr = element.attributes.filter(attr => attr.name === 'class')[0]
//     if(attr && attr.value === selector.replace('.', ''))
//       return true;
//   } else {
//     if (element.tagName === selector)
//       return true;
//   }
// }

function match(element, selector) {
  if (!selector || !element.attributes)
  return false;
  let parseRules = Tokenizer.parse(selector)

  let ruleGroup = parseRules.nodes
  let result = true;
  // 
  for(let j = 0; j < ruleGroup.length; j++) {
    let node = ruleGroup[j]
    let currentNode = node.nodes
    let i = currentNode.length-1
    let currentParentIndex = -1
    let isParent = false
    let copyElement = _.cloneDeep(element)
    for(;i>=0;i--){
      var currentRule = currentNode[i]
      var type = currentRule.type
      if (!copyElement) return false;
      var typeFn = {
        id: () => {
          var attr = copyElement.attributes.filter(attr => attr.name === 'id')[0]
          if(!attr || (attr && attr.value !== currentRule.name)){
            if (isParent) {
              copyElement = copyElement.parent
              while(copyElement&&!copyElement.attributes) {
                if (!copyElement) return false;
                copyElement = copyElement.parent
              }
              i = currentParentIndex
            } else {
              return false;
            }
          }
          return true;
        },
        class: () => {
          var attr = copyElement.attributes.filter(attr => attr.name === 'class')[0]
          if(!attr || (attr && attr.value !== currentRule.name)){
            if (isParent) {
              copyElement = copyElement.parent
              while(copyElement&&!copyElement.attributes) {
                if (!copyElement) return false;
                copyElement = copyElement.parent
              }
              i = currentParentIndex
            } else {
              return false;
            }
          }
          return true;
        },
        element: () => {
          if (copyElement.tagName !== currentRule.name){
            if (isParent) {
              copyElement = copyElement.parent
              i = currentParentIndex
            } else {
              return false;
            }
          }
          return true;
        },
        spacing: () => {
          // 接下来要查找父级了
          isParent = true
          currentParentIndex = i
          copyElement = copyElement.parent
          if (!copyElement) {
            return false;
          }
          return true;
        },
      }

      if (!typeFn[type](type)) {
        result = false
        break;
      }
    }

    if (result) return true;
  }
  
  return result;
}




// 解决优先级
function specificity(selector) {
  var p = [0,0,0,0]
  var selectorParts = selector.split(' ')
  for(var part of selectorParts) {
    if (part.charAt(0) == '#') {
      p[1] += 1;
    } else if (part.charAt(0) == '.') {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }

  return sp1[3] - sp2[3]
}

function computeCSS(element) {
  // stack 存放的是当前元素的所有父标签，
  // 从当前元素，逐层查找父元素;对应css中，从右往左匹配选择器
  var elements = stack.slice().reverse();
  if(!element.computedStyle)
    element.computedStyle = {};

  for (let rule of rules) {
    // 拆选择器 
    var selectorParts = rule.selectors[0].split(' ').reverse();

    // element, selectorParts[0]匹配当前元素
    // if(!match(element, selectorParts[0]))
    if(!match(element, rule.selectors[0]))
      continue;

    let matched = false;

    // ！！匹配父级元素；j被循环完，代表匹配上了
    var j = 1;
    for(var i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++;
      }
    }
    if (j >= selectorParts.length)
      matched = true;

    if(matched) {
      // 如果匹配到，要加入到规则中
      var sp = specificity(rule.selectors[0]);
      var computedStyle = element.computedStyle;
      for (var declaration of rule.declarations) {
        if (!computedStyle[declaration.property])
          computedStyle[declaration.property] = {};

        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }
    }
  }
}

function emit(token){
  let top = stack[stack.length -1]

  if (token.type == 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for(let p in token) {
      if (p != 'type' && p != 'tagName')
        element.attributes.push({
          name: p,
          value: token[p]
        });
    }

    // computeCSS(element)
    
    top.children.push(element)
    element.parent = top

    computeCSS(element)

    if (!token.isSelfClosing)
      stack.push(element);
    
    currentTextNode = null
  } else if(token.type == 'endTag'){
    if (top.tagName != token.tagName) {
      throw new Error('Tag start end doesn\'t match!')
    } else {
      // 遇到style标签时，执行添加css规则的操作
      if (top.tagName === 'style') {
        addCSSRules(top.children[0].content)
      }
      // 计算布局
      layout(top);
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type == "text") {
    if(currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}


function data(c){
 if (c == '<') {
   return tagOpen;
 } else if (c == EOF) {
   emit({
     type: "EOF"
   })
   return ;
 } else {
   emit({
     type: 'text',
     content: c
   })
   return data
 }
}
function tagOpen(c) {
  if (c == '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type: 'startTag',
      tagName: ''
    };
    // Reconsume
    return tagName(c);
  } else {
    emit({
      type: 'text',
      content: c
    })
    // return ;
    return tagOpen;
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c//.toLowerCase
    return tagName;
  } else if(c == '>') {
    emit(currentToken);
    return data;
  } else {
    currentToken.tagName += c//.toLowerCase
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '/' || c == '>'||c==EOF) {
    return afterAttributeName(c);
  } else if(c == '='){
    // return beforeAttributeName
  }
  else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function attributeName(c){
  if(c.match(/^[\t\n\f ]$/)||c == '/' || c == '>'||c==EOF) {
    return afterAttributeName(c);
  } else if(c == '='){
    return beforeAttributeValue
  } else if(c == '\u0000'){

  } else if(c == '\"'||c == '\'' || c == '<'){

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)||c == '/' || c == '>'||c==EOF){
    return beforeAttributeValue
  } else if(c == '\"'){
    return doubleQuotedAttributeValue;
  } else if(c == '\''){
    return singleQuetedAttributeValue;
  } else if(c == '>'){
    return data;
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == '\"'){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c == '\u0000'){

  } else if(c == EOF) {

  } else {
    currentAttribute.value +=c
    return doubleQuotedAttributeValue
  }
}

function singleQuetedAttributeValue(c) {
  if (c == '\''){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue
  } else if(c == '\u0000'){

  } else if(c == EOF){

  } else {
    currentAttribute.value += c
    return singleQuetedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(c == EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if(c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if(c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(c == '\u0000') {

  } else if(c == '\"' || c == '\"' || c == '<' || c =='=' || c == '`'){

  } else {
    currentAttribute.value +=c
    return UnquotedAttributeValue
  }
}

function selfClosingStartTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken)
    return data;
  } else if(c == 'EOF') {

  } else {

  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ''
    }
    return tagName(c)
  } else if(c == '>') {

  } else if(c == EOF) {

  } else {

  }
}

function afterAttributeName(c){
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c == '='){
    return beforeAttributeValue
  } else if(c == '>'){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken)
    return data
  } else if(c == EOF){
    // return beforeAttributeName
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}





module.exports.parserHtml = function parserHtml(html) {
  let state = data;
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  return stack[0]
}