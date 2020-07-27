// 添加了；restart；add方法改善
export class Timeline {
  constructor(){
    this.animations = []
    this.requsetID = null;
    this.state = 'inited'
    this.tick = () => {
      let t = Date.now() - this.startTime

      let animations = this.animations.filter(animation => !animation.finished)
      for(let animation of this.animations){
        
        let {object, property, start, end, timingFunction,delay,template,duration,addTime} = animation


        // timingFunction 参考网址  cubic-bezier.com

        let progression = timingFunction((t-delay-addTime)/duration) // 0-1之间的数

        if(t > duration + delay + addTime){
          progression = 1
          animation.finished = true
        }

        let value = start + progression * (end -start)  // value就是根据progression计算的当前值


        object[property] = template(value)
      }
      if (animations.length)
        this.requsetID = requestAnimationFrame(this.tick)
    }
  }

  pause(){
    if(this.state != 'playing')
      return;
    this.state = 'paused'

    this.pauseTime = Date.now()
    if(this.requsetID !== null)
      cancelAnimationFrame(this.requsetID)
  }

  resume(){
    if(this.state != 'paused')
      return;
    this.state = 'playing'

    // 相当于去掉暂停的时间
    this.startTime += Date.now() - this.pauseTime 
    this.tick()
  }

  start(){
    if(this.state != 'inited')
      return;
    this.state = 'playing'

    this.startTime = Date.now()
    this.tick()
  }

  restart(){
    if(this.state === 'playing')
      this.pause()
    this.animations = []
    this.requsetID = null
    this.state = 'playing'
    this.startTime = Data.now()
    this.pauseTime = null
    this.tick()
  }
  // addTime 用来处理后开始问题
  add(animation, addTime){
    this.animations.push(animation)
    animation.finished = false
    if(this.state === 'playing')
      animation.addTime = addTime !== void 0 ? addTime : Date.now()-this.startTime
    else
      animation.addTime = addTime !== void 0 ? addTime : 0
  }
}

export class Animation {
  constructor(object, property, template, start, end, duration, delay, timingFunction){
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay||0

    
    this.timingFunction = timingFunction
    // this.timingFunction = timingFunction || ((start, end) => {
    //   return t => start + (t / duration)* (end-start)
    // })
  }
}


/*

let animation = new Animation(object, property, start, end, duration, dalay, timingFunction)
let animation2 = new Animation(object, property, start, end, duration, dalay, timingFunction)

// 时间线 同时控制多个动画
let timeline = new Timeline

timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()


setTimeout
setInterval
requestAnimationFrame

*/