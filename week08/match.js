// 该代码，可在week07 toy-brower中进行测试
// server.js 中style 已改成#container .c1#dd

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