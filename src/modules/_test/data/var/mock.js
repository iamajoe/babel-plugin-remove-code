const stripA = 'foo';
const keepA = 'foo';
const stripBPattern = 'foo';
const keepBPattern = 'foo';

let stripC;
let keepC;
let stripFPattern;
let keepFPattern;

stripC = 'foo';
stripC = {};
keepC = 'foo';
stripFPattern = 'foo';
stripFPattern = {};
keepFPattern = 'foo';

export const stripG = {};
export const keepG = {};
export const stripHPattern = {};
export const keepHPattern = {};

export { stripD };
export { keepD };
export { stripIPattern };
export { keepIPattern };

export default { stripA, keepA, stripBPattern, keepBPattern };

console.log(stripA);
console.log(keepA);
console.log(stripBPattern);
console.log(keepBPattern);

if (stripA === 'foo') {}
if (keepA === 'foo') {}
if (stripBPattern === 'foo') {}
if (keepBPattern === 'foo') {}

if (stripC === 'foo' && keepC === 'foo') {}
if (stripFPattern === 'foo' && keepFPattern === 'foo') {}

keepA = stripA;
keepB = stripB && keepB;

if (global.stripProp === 'foo') {}
if (global.stripProp) {}
if (global['stripProp']) {}
if (stripIdentifier) {}
