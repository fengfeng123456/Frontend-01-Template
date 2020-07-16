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
    if(typeof child === 'string')
      child = new Text(child)
    o.appendChild(child)
  }

  return o
}
// 处理文本节点
class Text {
  constructor(text){
    this.children = []
    this.root = document.createTextNode(text)
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
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
class MyComponent{
  constructor() {
    this.children = []
    this.attributes = new Map
    this.properties = new Map
  }
  setAttribute(name, value) {
    // this.root.setAttribute(name, value)
  }
  appendChild(child){
    this.children.push(child)
  }
  render(){
    return <article>
      <header>I'm a header</header>
      {this.slot}
      <footer>I'm a footer</footer>
    </article>
  }
  mountTo(parent){
    // 这里会多出一层div，是因为这里会调用Wrap
    this.slot = <div></div>
    for(let child of this.children){
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
  }
}

let componet = <MyComponent>
  <div>text text text</div>
</MyComponent>
componet.mountTo(document.body)


console.log(componet)
