// 这里似乎没有用
var slice=Function.prototype.call.bind([].slice);

function testBg(msg){
    alert('this is from bg/index.js:' +msg)
}

console.log('----- chrome extensions: bg/index.js init')