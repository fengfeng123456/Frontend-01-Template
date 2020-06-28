var standards = [
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Basic_User_Interface',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Backgrounds_and_Borders',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Display',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Alignment',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Table',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/Microsoft_Extensions',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Text',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Shapes',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Table',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fragmentation',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transforms',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Color',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Generated_Content',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Miscellaneous',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/Compositing_and_Blending',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Text_Decoration',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Basic_User_Interface',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/Filter_Effects',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Masking',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_View',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Text',
  'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Overflow'
]





standards=[...new Set(standards)]


let iframe = document.createElement('iframe')
document.body.innerHTML=''
document.body.appendChild(iframe)

function happen(element, event) {
  return new Promise(function (resolve) {
    let handler = () => {
      resolve()
      element.removeEventListener(event, handler)
    }
    element.addEventListener(event, handler)
  })
  
}

var name1 = ['\n'];

void async function () {
  var output = []
  for(let standard of standards){
    iframe.src = standard
    // console.log(standard.name,standard.url)
    await happen(iframe, 'load')


    // var properties = Array.prototype.map.call(iframe.contentWindow.document.querySelectorAll(".propdef [data-dfn-type=property]"), e => e.childNodes[0].textContent);
    // if (properties.length) output.push(standard.name + " | " + properties.join(", "));

    // console.log(standard.name, properties)
    fn(iframe.contentWindow.document)
  }

  console.log(output.join("\n"))
}();

var name1 = ['\n'];

function fn(doc){
  doc = document
  var idIndex = doc.getElementsByClassName('title')[0]
  name1.push('////////////////////////////// '+idIndex.innerText + ' '
+window.location.href+

// 概述
  ' \n'+document.getElementById('wikiArticle').children[1].innerText +

  '\n')

  

  var items = doc.getElementsByClassName('index')

  items=[...items]

  items.forEach(item => {
    // 获得title
    titleChilds = item.parentElement.children
    if (titleChilds && titleChilds.length > 0) {
      titleChilds = [...titleChilds]
      index = titleChilds.indexOf(item)
      title = titleChilds[index-1]

      if(title&&title.tagName === 'H4'){
        name1.push('\n'+'----------- '+ title.innerText+'\n')
      }
    }

    // 获得属性值
    pros = item.getElementsByTagName('a');
    [...pros].forEach(obj => {
      // 判断这个属性现阶段属于什么状态
      // This is an experimental API that should not be used in production code.
      var blue = obj.parentElement.getElementsByClassName('icon-beaker')
      // This is an obsolete API and is no longer guaranteed to work.
      var red = obj.parentElement.getElementsByClassName('icon-trash')
      // This API has not been standardized.
      var yellow = obj.parentElement.getElementsByClassName('icon-warning-sign')
      // This deprecated API should no longer be used, but will probably still work.
      var black = obj.parentElement.getElementsByClassName('icon-thumbs-down-alt')

      var status = ''

      if (blue.length > 0) {
        status = ' -blue'
      }else if (red.length > 0) {
        status = ' -red'
      }else if (yellow.length > 0) {
        status = ' -yellow'
      }else if (black.length > 0) {
        status = ' -black'
      }

      name1.push(obj.innerText+ status +
      (obj.getAttribute('href') === null ? '' :  (' https://developer.mozilla.org/' +obj.getAttribute('href')))
      )
    })
  })
  name1.push('\n')
  console.log(name1.join('\n'))

}

fn()