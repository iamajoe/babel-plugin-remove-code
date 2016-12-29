const stripA = 'foo';
const keepA = 'foo';

let stripB;
let keepB;

stripB = 'foo';
stripB = {};
keepB = 'foo';

export const stripC = {};
export const keepC = {};

export { stripD };
export { keepD };

export default { stripA, keepA };

console.log(stripA);
console.log(keepA);

// TODO: Not yet implemented...
if (stripA === 'foo') {}
if (keepA === 'foo') {}
