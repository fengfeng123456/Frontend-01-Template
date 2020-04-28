## 总结






## 问：找出 JavaScript 标准里有哪些对象是我们无法实现出来的，都有哪些特性？

> 通过 “exotic object” 关键字在标准中查询，得到结果

4.3.7 exotic object   // 独特的object
  
  object that does not have the default behaviour for one or more of the essential internal methods
> Any object that is not an ordinary object is an exotic object.

9.4.1 Bound Function Exotic Objects

    [[Call]] [[Construct]]

9.4.2 Array Exotic Objects

    [[DefineOwnProperty]]

9.4.3 String Exotic Objects

    [[GetOwnProperty]]  [[DefineOwnProperty]] [[OwnPropertyKeys]]

9.4.4 Arguments Exotic Objects

    [[GetOwnProperty]]  [[DefineOwnProperty]] [[Get]] [[Set]] [[Delete]]

9.4.5 Integer-Indexed Exotic Objects

    [[GetOwnProperty]] [[HasProperty]] [[DefineOwnProperty]] 
    [[Get]] [[Set]] [[OwnPropertyKeys]]

9.4.6 Module Namespace Exotic Objects

    [[SetPrototype]] [[IsExtensible]] [[PreventExtensions]] [[GetOwnProperty]] 
    [[DefineOwnProperty]] [[HasProperty]] [[Get]] [[Set]] [[Delete]]
    [[OwnPropertyKeys]]

9.4.7 Immutable Prototype Exotic Objects

    [[SetPrototypeOf]]



分别对应：

1. bind后的function: 跟原来的函数相关联。
2. Array的length：其根据最大的下标自动发生变化
3. String的下标：为了支持下标运算，String的正整数属性访问会去字符串里查找
4. Arguments：arguments 的非负整数型下标属性跟对应的变量联动。
5. 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
6. 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
7. Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。`Object.setPrototype(Object.prototype, {}) //报错`

> 对应内容来自winter老师的《重学前端》-JavaScript对象：你知道全部的对象分类吗？