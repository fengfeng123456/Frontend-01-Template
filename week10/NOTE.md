# 每周总结可以写在这里

性能：
操作dom，可以用Range来提高性能；

CSSOM最重要，最实用的API：
getClientRects
getBoundingClientRect

window.innerHeight
window.innerWidth
// 可以得到与上面两个api相同的值
document.documentElement.getBoundingClientRect
window.devicePixelRatio


井字棋：
二维数组（最差），
一维数组（最好），
Map


性能：
绑定过多事件，不是会影响性能吗？
性能的好坏是实际测出来的，
不是凭空想象出来的，或者像网上文章写的一样；
就像for循环和while的性能差异，要考虑的是，
第一是，这个地方需不需要性能；
其次，才是性能好坏的问题；
而对事件这个事情来说，二者皆否；
第一，这个地方不需要性能；
第二，绑定过多的事件也不会影响性能，触发过多事件才会影响性能；


初始值：
与的关系，初始化是true；或的关系，初始化是false;
+初始化是0；*初始化是1；

