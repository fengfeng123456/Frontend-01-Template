


// React 仿写 React.createElement
// class React{}
// React.createElement = function createElement(Cls, attributes){
//   let o = new Cls

//   for(let name in attributes){
//     o[name] = attributes[name]
//   }

//   return o
// }

function create(Cls, attributes){
  let o = new Cls

  for(let name in attributes){
    o[name] = attributes[name]
  }

  return o
}

class Div{}

// JSX Cls 首字母大写，认为是构造函数
// cls 首字母小写，认为是字符串
let componet = <Div id="a" />

console.log(componet)
// componet.setAttribute('id', 'b')
// 38

