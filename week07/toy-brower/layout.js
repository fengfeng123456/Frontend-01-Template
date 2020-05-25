function getStyle(element) {
  if(!element.style)
    element.style = {}

  for(let prop in element.computedStyle) {
    var p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;

    // 处理单位
    if(element.style[prop].toString().match(/px$/)){
      element.style[prop] = parseInt(element.style[prop]);
    }
    if(element.style[prop].toString().match(/^[0-9\.]+$/)){
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  return element.style;
}

function layout(element) {
  if(!element.computedStyle)
    return;

  // 元素的style预处理
  var elementStyle = getStyle(element);

  // 这里只处理flex布局
  if(elementStyle.display !== 'flex')
    return;

  // 只处理不是文本节点的元素
  var items = element.children.filter(e => e.type === 'element');

  // 对子元素进行排序
  items.sort(function(a, b) {
    return (a.order || 0) - (b.order || 0)
  })

  var style = elementStyle;

  // 处理宽高是auto和空的情况
  ['width','height'].forEach(size => {
    if(style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  })

  // 设置flex布局，各个属性的默认值
  if(!style.flexDirection || style.flexDirection === 'auto')
    style.flexDirection = 'row';
  if(!style.alignItems || style.alignItems === 'auto')
    style.alignItems = 'stretch';
  if(!style.justifyConent || style.justifyConent === 'auto')
    style.justifyConent = 'flex-start';
  if(!style.flexWrap || style.flexWrap === 'auto')
    style.flexWrap = 'nowrap';
  if(!style.alignContent || style.alignContent === 'auto')
    style.alignContent = 'stretch';

  /**
   * 抽象出方向
   * mainSize：尺寸，[属性名]
   * mainStart, mainEnd：通过方向决定值 [属性名]
   * mainBase：做排版的时候的起点；从左到右0；从右往左就是元素的宽度值；
   * mainSign：（符号）排布的方向，从左到右是+1；从右到左是-1；
   * 其他变量为，交叉轴相关变量
   */
    
  var mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;
  if(style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if(style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if(style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if(style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  // wrap-reverse：反转 wrap 排列。只会影响交叉轴；
  if(style.flexWrap === 'wrap-reverse') {
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  var isAutoMainSize = false;

  // 尺寸设置为空或者auto  
  if(!style[mainSize]) {  // auto sizing
    elementStyle[mainSize] = 0;
    for(var i=0;i<items.length;i++){
      var item = items[i];
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) 
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
    }
    isAutoMainSize = true;
  }

  // flexLine:代表行，有多个flexItem
  var flexLine = [];
  var flexLines = [flexLine];

  var mainSpace = elementStyle[mainSize];
  var crossSpace = 0;

  for(var i=0; i<items.length;i++){
    var item = items[i];
    var itemStyle = getStyle(item);
    
    if(itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if(itemStyle.flex){
      flexLine.push(item);
    }else if(style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !==(void 0))
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      flexLine.push(item);
    } else {
      if(itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if(mainSpace<itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;

  if(style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if(mainSpace < 0) {
    var scale = style[mainSize] / (style[mainSize] - mainSpace);
    var currentMain = mainBase;
    for(var i=0;i<items.length;i++){
      var item = items[i];
      var itemStyle = getStyle(item);

      if(itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    flexLines.forEach(function(items){
      var mainSpace = items.mainSpace;
      var flexTotal = 0;
      for(var i=0;i<items.length;i++){
        var item = items[i];
        var itemStyle = getStyle(item);

        if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      if (flexTotal > 0){
        var currentMain = mainBase;
        for(var i=0; i<items.length; i++){
          var item = items[i];
          var itemStyle = getStyle(item);

          if(itemStyle.flex){
            itemStyle[mainSize] = (mainSpace/flexTotal)*itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        if(style.justifyConent === 'flex-start') {
          var currentMain = mainBase;
          var step = 0;
        }
        if(style.justifyConent === 'flex-end') {
          var currentMain = mainSpace*mainSign + mainBase;
          var step = 0;
        }
        if(style.justifyConent === 'center') {
          var currentMain = mainSpace/2*mainSign + mainBase;
          var step = 0;
        }
        if(style.justifyConent === 'space-between') {
          var step = mainSpace/(items.length - 1) * mainSign;
          var currentMain = mainBase;
        }
        if(style.justifyConent === 'space-around') {
          var step = mainSpace/items.length * mainSign;
          var currentMain = step / 2 + mainBase;
        }

        for (var i=0;i<items.length;i++){
          var item = items[i];
          itemStyle[mainStart, currentMain];
          itemStyle[mainEnd] = itemStyle[mainStart]+mainSign*itemStyle[mainSize]
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    })
  }

  var crossSpace;

  if(!style[crossSize]){  // auto sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for (var i = 0; i<flexLines.length;i++){
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize]
    for (var i=0;i<flexLines.length;i++){
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if(style.flexWrap === 'wrap-reverse'){
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }
  var lineSize = style[crossSize] / flexLines.length;

  var step;
  if(style.alignContent === 'flex-start'){
    crossBase += 0;
    step = 0;
  }
  if(style.alignContent === 'flex-end'){
    crossBase += crossSign*crossSpace
    step = 0;
  }
  if(style.alignContent === 'center'){
    crossBase += crossSign*crossSpace/2
    step = 0;
  }
  if(style.alignContent === 'space-between'){
    crossBase += 0;
    step =  crossSpace/(flexLines.length-1)
  }
  if(style.alignContent === 'space-around'){
    step = crossSpace/(flexLines.length);
    crossBase += crossSign*step/2;
  }
  if(style.alignContent === 'stretch'){
    crossBase +=0;
    step = 0;
  }

  flexLines.forEach(function(items){
    var lineCrossSize = style.alignContent === 'stretch'?
      items.crossSpace + crossSpace/flexLines.length : 
      items.crossSpace;
    for(var i=0;i<items.length;i++){
      var item = items[i]
      var itemStyle = getStyle(item);

      var align = itemStyle.alignSelf || style.alignItems;

      if(itemStyle[crossSize] === null)
        itemStyle[crossSize] = (align === 'stretch')?
          lineCrossSize:0;

      if(align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign*itemStyle[crossSize];
      }
      if(align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign*lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign*itemStyle[crossSize];
      }
      if(align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign*(lineCrossSize-itemStyle[crossSize])/2
        itemStyle[crossEnd] = itemStyle[crossStart] - crossSign*itemStyle[crossSize];
      }
      if(align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign*((itemStyle[crossSize] !==null && itemStyle[crossSize] !== (void 0))?
        itemStyle[crossSize]:lineCrossSize;

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd]-itemStyle[crossStart])

      }
    }
    crossBase += crossSign*(lineCrossSize+step);
  })
  console.log(items);
}

module.exports = layout;