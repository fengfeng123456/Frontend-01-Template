// 该代码，可在week07 toy-brower中进行测试
// server.js 中style 已改成#container .c1#dd
// 该函数只处理了，id、class、空格和tag

function match(element, selector) {
    if (!selector || !element.attributes)
    return false;
    // 通过Tokenizer 库解析selector，获得一个形如一下格式的数据结构
    // {
    // type: "selectors",
    // nodes: [
    //     {
        //     type: "selector",
        //     nodes: [
        //         { type: "element", name: "a" },
        //         { type: "id", name: "content" },
        //         { type: "class", name: "active" },
        //         { type: "operator", operator: ">", before: " ", after: " " },
        //         { type: "element", name: "div" },
        //         { type: "pseudo-element", name: "first-line" },
        //         { type: "spacing", value: " " },
        //         { type: "attribute", content: "data-content" },
        //     ]
    //     }
    // ]}
    // 从后往头，一个个解析选择器是否与当前元素的，各种属性相匹配
    // 需要注意的是通过最外层的nodes得到的是选择器列表，也就是逗号分割的选择器；
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