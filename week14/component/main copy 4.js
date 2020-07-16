function create(Cls, attributes, ...children){
  console.log(arguments)
  
  let o 
  if (typeof Cls === 'string'){
    // 解决当，元素是小写的时候，传过来的cls是字符串的行为 'div'
    o = new Wrap(Cls)
  } else {
    o = new Cls
  }

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

class Wrap{
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
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

let componet = <div id="a" class="b" style="width:100px;height:100px;background-color:red;">
  <Div />
  <Div />
  <Div />
</div>
componet.mountTo(document.body)


console.log(componet)
