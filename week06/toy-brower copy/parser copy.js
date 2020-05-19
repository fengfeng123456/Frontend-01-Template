// class parserHtml{

// }

// export default parserHtml
let currentToken = null;
let currentAttribute = null;

function emit(token){
  if (token.type != "text")
    console.log(token);
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
  if (c == '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type: 'string',
      tagName: ''
    };
    // Reconsume
    return tagName(c);
  } else {
    emit({
      type: 'text',
      content: c
    })
    return ;
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

function endTagOpen(c) {
  if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type: 'endTag'
    }
  }
}






module.exports.parserHtml = function parserHtml(html) {
  let state = data;
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
}