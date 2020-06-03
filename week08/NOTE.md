# 每周总结可以写在这里

选择器列表：是带逗号的选择器，a,a

div svg|a

|:代表命名空间，选中svg命名空间中的a；


计算优先级：
[行内,id,(class|属性选择器|伪类),tag]

通配选择符（universal selector）（*）关系选择符（combinators）（+, >, ~, ' ', ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。


伪类选择器，
nth-last-child,last-child,only-child不推荐使用，因为在computed css的时候，不能直接计算处理；

first-line为什么不能使用float？
因为一行如果float就脱离了文档流，之后就会形成新的一行，那这个新的一行又会成为first-line,就会形成一个无限循环；

first-line为什么可以使用word-break？

不是先算好哪些文字属于first-line，再去应用这些属性；而是在排版的时候，直接把first-line的属性，直接加到文字上；
first-line的属性，除了line-height以外其他的属性都属于inline；

first-line：是排版完之后，确定的第一行；
first-letter：不是排版完之后再确定第一个字，而是在未排版，在最开始就知道第一个文字是哪个内容了；


css排版

排版和渲染的基本单位是盒；

line-box概念：一行

inline-formatting-context：从左到右
block-formatting-content：从上到下

正常流的行模型，IFC
中文不管基线

inline-block使用vertical-align:只用middle，top，bottom其他值，会出现问题；

文字排版网站：
https://www.freetype.org/freetype2/docs/tutorial/step2.html

line-height、font-weight及文字的height等的文字表现，会跟文字字体有关；
之所以有一些文字line-height不居中，与字体有关；

Element.getClientRects()：获得该元素中，有多少个盒子


边距折叠，只会发生在BFC中，
margin可以理解为是留白；

BFC产生，能容纳正常流的容器，并且overflow不等于visible





