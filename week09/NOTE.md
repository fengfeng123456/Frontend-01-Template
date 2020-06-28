# 第一课 CSS动画

  * 动画中的贝塞尔曲线
    * https://cubic-bezier.com/#.17,.67,.83,.67
    * https://zh.wikipedia.org/wiki/ 貝茲曲線 

  * 为什么用贝塞尔曲线？
  
    因为它最大的特点就是“平滑”

  * 作用
    
    利用 `getComputedStyle(document.body)` 得到的属性，进行分类，画出xmind

    function fn(){
      var idIndex = document.getElementsByClassName('title')[0]
      console.log('////////////////////////////// '+idIndex.innerText)

      var name1 = ['\n'];

      var items = document.getElementsByClassName('index')
      <!-- [0].children[0].getElementsByTagName('a') -->

      items=[...items]

      items.forEach(item => {
        // 获得title
        titleChilds = item.parentElement.children
        if (titleChilds && titleChilds.length > 0) {
          titleChilds = [...titleChilds]
          index = titleChilds.indexOf(item)
          title = titleChilds[index-1]

          if(title&&title.tagName === 'H4'){
            name1.push('----------- '+ title.innerText)
          }
        }

        // 获得属性值
        <!-- pros = item.children; -->
        pros = item.getElementsByTagName('a');
        [...pros].forEach(obj => {
          <!-- obj = obj.getElementsByTagName('a') -->
          name1.push(obj.innerText+
          (obj.getAttribute('href') === null ? '' :  (' https://developer.mozilla.org/' +obj.getAttribute('href')))
          )
        })
      })
      name1.push('\n')
      console.log(name1.join('\n'))

    }

    fn()



# 第二课 重学HTML

  语义标签，用对不不用好，不用比用错好

  Dom API
  