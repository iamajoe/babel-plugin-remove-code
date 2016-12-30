function stripA () {}
function keepA () {}
const keepB = function stripB () {};

stripA();
console.keepC('foo');
console.keepC.stripC('foo');
console.stripD('bar');
console.stripD.keepD('bar');

stripA(keepC());
keepC(stripA());
