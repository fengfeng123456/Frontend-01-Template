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


  