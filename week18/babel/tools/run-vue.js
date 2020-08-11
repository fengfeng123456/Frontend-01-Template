const compiler = require('@vue/compiler-sfc');

const output = compiler.compileTemplate({
  filename: 'example.vue',
  source: '<div>Hello World</div>',
});

console.log(output);