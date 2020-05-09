// 18.1 Value Properties of the Global Object
// 作业：56:00
let set = new Set()
let globalProperties = [
  "RangeError",
  "eval",
  "DataView",
  "Set",
  "Map",
  "Math"
]

var queue = []

for(var p of globalProperties) {
  queue.push({
    path: [p],
    object: globalThis[p]
  })
}

let current;

while(queue.length) {
  current = queue.shift()
  console.log(current.path.join('.'))
  if (set.has(current.object)) continue;
  set.add(current.object)

  // 为什么不是这样？？？
  // var pass= current.object !== null && typeof current.object === 'object' || typeof current.object === 'function'
  // if (!pass) continue;

  for (let p of Object.getOwnPropertyNames(current.object)) {
    var property = Object.getOwnPropertyDescriptor(current.object, p)

    if (property.hasOwnProperty('value') &&
    (current.object !== null) && (typeof current.object === 'object') || (typeof current.object === 'function')
    && property.value instanceof Object) 
      queue.push({
        path:current.path.concat([p]),
        object:property.value
      })
    if(property.hasOwnProperty('get')&&typeof property.get === 'function')
      queue.push({
        path:current.path.concat([p]),
        object:property.get
      })
    if(property.hasOwnProperty('set')&&typeof property.set === 'function')
      queue.push({
        path:current.path.concat([p]),
        object:property.set
      })

  }
}

