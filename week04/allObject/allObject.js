import { date as obj } from "./reaml.js";

const data = handleDate(obj)


const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 15000;
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: [{
        type: 'collapse-expand',
        onChange: function onChange(item, collapsed) {
          const data = item.get('model').data;
          data.collapsed = collapsed;
          return true;
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  defaultNode: {
    size: 12,
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      stroke: '#A3B1BF',
    },
  },
  layout: {
    type: 'mindmap',
    direction: 'H',
    getHeight: () => {
      return 16;
    },
    getWidth: () => {
      return 16;
    },
    getVGap: () => {
      return 10;
    },
    getHGap: () => {
      return 100;
    },
    getSide: () => {
      return 'right';
    },
  },
});

let centerX = 0;
graph.node(function (node) {
  if (node.id === 'Modeling Methods') {
    centerX = node.x;
  }

  return {
    // label: node.id,
    labelCfg: {
      position: node.children && node.children.length > 0 ?
        'right' :
        node.x > centerX ?
        'right' :
        'left',
      offset: 5,
    },
  };
});


graph.data(data);
graph.render();
graph.fitView();


// 处理数据
function handleDate(obj) {
  let renArr = []
  let path
  let data = {
    global: {
      id: 'global',
      label: 'global',
      children: {}
    }
  }
  for (let item of obj) {
    path = item.split('.')
    arrTranfObj(path, data.global.children)
  }
  console.log(data)
  // 转换成G6想要的data
  objTranG6(data, renArr)
  console.log(renArr)

  return renArr[0]
}
// 需求
// 有一个数组，把数组的内容转换成对象的层级，得到一个对象，
var index = 0

function arrTranfObj(arr, obj) {
  let i = 0
  let item = arr[i]
  if (!obj[item]) {
    obj[item] = {
      id: item + '-' + (index++),
      label: item
    }
    if (arr[i + 1]) {
      obj[item].children = {}
      arrTranfObj(arr[i + 1], obj[item].children)
    }
  } else {
    if (arr[i + 1]) {
      if (!obj[item].children) obj[item].children = {}
      arrTranfObj(arr.slice(i + 1), obj[item].children)
    }
  }
}

// 从对象转换成G6想要的data
function objTranG6(obj, arr) {
  for (let key in obj) {
    var item = obj[key]
    arr.push(JSON.parse(JSON.stringify(item)))
    if (item.children) {
      arr[arr.length - 1].children = []
      objTranG6(item.children, arr[arr.length - 1].children)
    }
  }
}
