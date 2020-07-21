
import {createElement, Text, Wrapper} from './createElement'
class Carousel{
  constructor() {
    this.children = []
    this.attributes = new Map
    this.properties = new Map

    this.data = []
  }
  setAttribute(name, value) {
    this[name] = value
  }
  appendChild(child){
    this.children.push(child)
  }
  render(){
    let children = this.data.map(url => {
      let element = <img src={url}/>
      // 这里返回的是一个对象，，需要去root才能获得元素
      element.addEventListener('dragstart', event => event.preventDefault())
      return element
    })
    let root = <div class="carousel">
      {children}
    </div>
    let position = 0
    let nextPic = () =>{
      // 获得一定范围内的数字循环，取余算法 
      let nextPosition = (position+1)%this.data.length

      let current = children[position];
      let next = children[nextPosition]

      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'
      // 开始状态
      current.style.transform = `translateX(${-100*position}%)`
      next.style.transform = `translateX(${100 - 100*nextPosition}%)`

      setTimeout(() => {
        current.style.transition = ''
        next.style.transition = ''
        // 结束状态
        current.style.transform = `translateX(${-100-100*position}%)`
        next.style.transform = `translateX(${-100*nextPosition}%)`

        position = nextPosition
      }, 16)

      setTimeout(nextPic, 3000)
    }
    // 保持第一个停留3s
    // setTimeout(nextPic, 3000)

    root.addEventListener('mousedown', event => {
      let startX = event.clientX,
        startY = event.clientY;

      let lastPosition = (position - 1 + this.data.length) % this.data.length
      let nextPosition = (position + 1) % this.data.length

      let current = children[position]
      let last = children[lastPosition]
      let next = children[nextPosition]

      current.style.transition = 'ease 0s'
      last.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'
      // 开始状态
      current.style.transform = `translateX(${-500*position}px)`
      last.style.transform = `translateX(${-500 - 500*lastPosition}px)`
      next.style.transform = `translateX(${500 - 500*nextPosition}px)`


      let move = event => {

        current.style.transform = `translateX(${event.clientX-startX-500*position}px)`
        last.style.transform = `translateX(${event.clientX-startX-500 - 500*lastPosition}px)`
        next.style.transform = `translateX(${event.clientX-startX+500 - 500*nextPosition}px)`
      }

      let up = event => {
        // 偏移量，，移动一半，就当移动成功
        let offset = 0

        if (event.clientX - startX > 250) {
          offset = 1
        } else if (event.clientX - startX < -250) {
          offset = -1
        }

        current.style.transition = ''
        last.style.transition = ''
        next.style.transition = ''

        current.style.transform = `translateX(${offset*500-500*position}px)`
        last.style.transform = `translateX(${offset*500-500 - 500*lastPosition}px)`
        next.style.transform = `translateX(${offset*500+500 - 500*nextPosition}px)`


        position = (position - offset + this.data.length) % this.data.length

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)

    })


    // 第一步
    return root
  }
  mountTo(parent){
    // 这里会多出一层div，是因为这里会调用Wrap
    // this.slot = <div></div>
    // for(let child of this.children){
    //   this.slot.appendChild(child)
    // }
    this.render().mountTo(parent)
  }
}

let componet = <Carousel>
</Carousel>

componet.data = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];
componet.mountTo(document.body)


console.log(componet)
