
import {createElement, Text, Wrapper} from './createElement'
// import {Carousel} from './Carousel.view'

import {Timeline, Animation} from "./animation";
import {ease  } from "./cubicBezier";

import {enableGesture} from "./gesture";
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
      let element = <img src={url} onStart={() =>timeline.pause()}/>
      // 这里返回的是一个对象，，需要去root才能获得元素
      element.addEventListener('dragstart', event => event.preventDefault())
      return element
    })
    let root = <div class="carousel">
      {children}
    </div>
    let position = 0

    let timeline = new Timeline
    // window.xtimeline = timeline
    timeline.start()


    let nextPic = () =>{
      // 获得一定范围内的数字循环，取余算法 
      let nextPosition = (position+1)%this.data.length

      let current = children[position];
      let next = children[nextPosition]

      let currentAnimation = new Animation(current.style, 'transform',
       -100 * position, -100 - 100 * position, 500, 0, ease, v => `translateX(${v}%)`)
      let nextAnimation = new Animation(next.style, 'transform',
         100 - 100 * nextPosition, -100 * nextPosition, 500, 0, ease, v => `translateX(${v}%)`)

      timeline.add(currentAnimation)
      timeline.add(nextAnimation)



      position = nextPosition

      // window.xstopHandler = setTimeout(nextPic, 3000)
      setTimeout(nextPic, 3000)
    }
    // 保持第一个停留3s
    setTimeout(nextPic, 3000)

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
