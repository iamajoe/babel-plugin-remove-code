const stripA = 'foo';
const keepA = 'foo';

let stripB;
let keepB;

stripB = 'foo';
keepB = 'foo';

export const stripC = {};
export const keepC = {};

export { stripD };
export { keepD };

// TODO: Not yet implemented...
console.log(stripA);
console.log(keepA);

export default { stripA };

if (stripA === 'foo') {}
if (keepA === 'foo') {}
