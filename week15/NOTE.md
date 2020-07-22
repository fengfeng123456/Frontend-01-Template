# 第一堂课

仿照vue，写FSC风格的代码
https://cn.vuejs.org/v2/guide/single-file-components.html

怎样写一个webpackloader
https://webpack.js.org/contribute/writing-a-loader/


1.问题：Carousel.view文件中script标签中有大于号，怎么办？现有的parser没有处理这部分。

http://html.spec.whatwg.org/multipage/parsing.html#tokenization

根据12.2.5.15这一块对于规则的描写，<script></script>标签之中，大于号不处理，只处理</script>

第六周paser.js

2.windows 的WPF  UI系统可以参考看组件化

docs.microsoft.com/en-us/dotnet/api/system.windows.uielement?view=netcore-3.1

3.学习重点，组件Class的设计和createElement的设计
createElement的设计，涉及了attributes的设计
Class的设计，涉及prototype和舍命周期，各种方法

# 第二堂课

  1.做动画

  1-1,重要的两个类
  // 时间线
  export class Timeline {

  }

  export class Animation {

  }

  2.animation

  实现的动画函数，只需要重写valueFromProgression方法，大致就能满足需求