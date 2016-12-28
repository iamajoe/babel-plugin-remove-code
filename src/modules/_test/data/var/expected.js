'use strict';
/* eslint-disable no-console */

let foo;

foo = 'bar';
console.log(foo);

foo = 'foo';
console.log(foo);

if (foo === 'foo') {
    console.log(foo);
}

if (foo === 'str' || foo === 'foo') {
    console.log(foo);
}

foo = 'foo';

export { foo };
