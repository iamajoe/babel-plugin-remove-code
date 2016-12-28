'use strict';
/* eslint-disable no-console, no-unused-vars */

let foo;
const simple = 'string';

export const bar = {
    test1: () => {
        console.log(foo);
    }
};

foo = 'bar';
console.log(foo);
console.log(bar);

foo = 'foo';
console.log(foo);

if (bar === 'foo') {
    console.log(bar);
}
if (bar === 'foo') { console.log(bar); }

if (bar === 'foo' && foo === 'foo') {
    console.log(foo);
} else if (bar === 'bar') {
    console.log(bar);
}

if (foo === 'str' || bar === 'foo' && foo === 'foo') {
    console.log(foo);
}

foo = bar || 'foo';

export { foo };
