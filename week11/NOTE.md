# 每周总结可以写在这里



## 最短路径
难点：
  1.用鼠标画画
  2.保存数据

1.用什么数据结构，保存数据？
地图比较大的情况下，用一维数组【推荐】


1.1 创建一个一万的长度的数组，并且填充0；

new Array(10001).join(0).split('').map(s=> Number(s))

new Array(10000).fill(0)

1.2 怎么在建立好的方格上，画出路径呢？

  -1.声明一个标志
  -2.监听document的mousedown和mouseup事件，改变标志
  -3.监听cell的mouseover，通过判断标志，来画内容


正则

  String.prototype.match && 正则带小括号

    "abc".match(/a(b)c/)  // 推荐用法 会捕获括号中的内容
    "abc".match(/a(b)c/g) // 这种结果中。不带小括号中的内容

    怎么办,不想捕获括号中的内容？
    "abc".match(/a?:(b)c/)  // ?:() 结果中，就不存在括号中的内容了

  String.prototype.replace

    "abc".replace(/a(b)c/, function(str, $1){ return $1+$1})
    "abc".replace(/a(b)c/, '$1$1')  // 与上面写法得到结果相同

    怎么办，想要替换的字符就是$1?
    "abc".replace(/a(b)c/, '$$1$$1')  // 结果：$1$1

  Ex.prototype.exec // 可以处理大段、巨大文本



