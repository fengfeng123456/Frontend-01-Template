// 18.1 Value Properties of the Global Object
let set = new Set()
let globalProperties = [
  // 'globalThis',
  'eval',
  'isFinite',
  'isNaN',
  'parseFloat',
  'parseInt',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'Array',
  'Date',
  'RegExp',
  'Promise',
  'Proxy',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'Function',
  'Boolean',
  'String',
  'Number',
  'Symbol',
  'Object',
  'BigInt',
  'BigInt64Array',
  'BigUint64Array',
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
  'ArrayBuffer',
  'SharedArrayBuffer',
  'DataView',
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array',
  'Uint8ClampedArray',
  'Atomics',
  'JSON',
  'Math',
  'Reflect'
]

var queue = []

for(var p of globalProperties) {
  queue.push({
    path: [p],
    object: globalThis[p]
  })
}

let current;

let result = new Set()

while(queue.length) {
  current = queue.shift()
  // console.log(current.path.join('.'))
  if (set.has(current.object)) continue;
  set.add(current.object)
  result.add(current.path.join('.'))

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

export {
  result as data
}

