
import {
  createElement,
  Text,
  Wrapper
} from './createElement'

export class TabPanel {
  constructor() {
    this.children = []
    this.attributes = new Map
    this.properties = new Map

    this.data = []
    this.state = Object.create(null)
  }
  setAttribute(name, value) {
    this[name] = value
  }
  appendChild(child) {
    this.children.push(child)
  }
  render() {
    // 怎么做tabpanel
    return <div class="panel" style="border: 1px solid lightgreen;width:300px;">
        <h1 style="background-color:lightgreen;height: 80px;padding:0;margin:0;">title</h1>
        {this.children.map(child => <div style = "height: 100px;background:#fff;">{child}</div>)}
      </div>
    
  }
  mountTo(parent) {
    // 这里会多出一层div，是因为这里会调用Wrap
    // this.slot = <div></div>
    // for(let child of this.children){
    //   this.slot.appendChild(child)
    // }
    this.render().mountTo(parent)
  }
}