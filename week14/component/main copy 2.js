function create(Cls, attributes, ...children){
  console.log(arguments)
  let o = new Cls

  for(let name in attributes){
    // 设置property
    o[name] = attributes[name]
    // 设置attribute
    o.setAttribute(name, attributes[name])
  }

  // 处理child
  for(let child in children){
    o.children.push(child)
  }

  return o
}

class Div{}

class Parent{
  constructor() {
    this.children = []
  }
  // 设置property
  set id(val) {
    console.log('Parent::id', val)
  }
  set class(val) {
    console.log('Parent::class', val)
  }
  // 设置attribute
  setAttribute(name, value) {
    console.log('Parent::attribute', name, value)
  }
}

class Child{
  
}
// JSX Cls 首字母大写，认为是构造函数
// cls 首字母小写，认为是字符串
let componet = <Parent id="a" class="b">
  <Child />
  <Child />
  <Child />
</Parent>

// let component = create(
//   Parent,
//   {
//     id: 'a',
//     class: 'b'
//   },
//   Child,
//   Child,
//   Child
// )

console.log(componet)
// componet.setAttribute('id', 'b')
// 38

// JSX 核心是怎么实现attribute，property