function create(Cls, attributes, ...children){
  console.log(arguments)
  let o = new Cls

  for(let name in attributes){
    // 设置property
    // o[name] = attributes[name]
    // 设置attribute
    o.setAttribute(name, attributes[name])
  }

  // 处理child
  for(let child of children){
    o.appendChild(child)
  }

  return o
}

class Div{
  constructor() {
    this.children = []
    this.root = document.createElement('div')
  }
  setAttribute(name, value) {
    console.log('Parent::attribute', name, value)
    this.root.setAttribute(name, value)
  }
  appendChild(child){
    this.children.push(child)
  }
  mountTo(parent){
    parent.appendChild(this.root)
    for(let child of this.children){
      child.mountTo(this.root)
    }
  }
}

// JSX Cls 首字母大写，认为是构造函数
// cls 首字母小写，认为是字符串
let componet = <Div id="a" class="b" style="width:100px;height:100px;background-color:red;">
  <Div />
  <Div />
  <Div />
</Div>
componet.mountTo(document.body)
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