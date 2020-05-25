// class parserHtml{

// }
const css = require('css')

// export default parserHtml
let currentToken = null;
let currentAttribute = null;

let stack = [{type: 'document', children: []}]
let currentTextNode = null

// 把css规则暂存到一个数组里
let rules = []
function addCSSRules(text) {
  var ast = css.parse(text)
  console.log(JSON.stringify(ast, null, "   "))
  rules.push(...ast.stylesheet.rules)
}

function computeCSS(element) {
  console.log(rules)
  console.log('compute CSS for Element', element)
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

    computeCSS(element)

    top.children.push(element)
    element.parent = top

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
const EOF = Symbol('EOF');

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
  // if (c.match(/^[\t\n\f ]$/)){
  //   return tagOpen;
  // } else 
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
    return tagOpen;
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

// function endTagOpen(c) {
//   if(c.match(/^[a-zA-Z]$/)){
//     currentToken = {
//       type: 'endTag'
//     }
//   }
// }






module.exports.parserHtml = function parserHtml(html) {
  let state = data;
  for (let c of html) {
    console.log(c)
    if (c == 'i'){

      state = state(c)
    } else {

      state = state(c)
    }
  }
  state = state(EOF)
  console.log(stack[0])
}