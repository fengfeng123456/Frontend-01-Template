# Proxy---一般在库中使用

  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

  不是在业务中使用；一般在库中使用
  很神奇的内容部分


  https://github.com/vuejs/vue-next/blob/master/packages/reactivity/__tests__/effect.spec.ts
  vue中的应用reactive

  it('should observe basic properties', () => {
    let dummy
    // 这里是怎么实现的？？
    const counter = reactive({ num: 0 })
    effect(() => (dummy = counter.num))

    expect(dummy).toBe(0)
    counter.num = 7
    expect(dummy).toBe(7)
  })

# 拖拽


# 组件化基础

  前端架构主体：
  1.80%组件问题
  2.其他就是架构模式：UI架构模式+零零碎碎的基础库
  
  Carousel组件

  state
    activeIndex

  property
    loop time imglist autoplay color forward

  attribute
    startIndex loop time imglist autoplay color forward

  children
    2
    append remove add

  event
    change click hover swipe resize dbclick

  method
    next() prev() goto()
    play() stop() // aotoplay 二者选一

  config
    mode: “userRAF”，“userTimeout"

  CarouselView  // imglist 二者只有一个