# babel-plugin-remove-code

> Remove any code from your project.

[![Build Status](https://travis-ci.org/Sendoushi/babel-plugin-remove-code.svg?branch=master)](https://travis-ci.org/sendoushi/babel-plugin-remove-code)

**Supported removals**

- [x] [debugger](#debugger)
- [x] [var](#var)
- [x] [export](#export)
- [x] [import](#import)
- [x] [function](#function)
- [ ] ???

## Example

#### Debugger
**In**

```javascript
// Debugger...
debugger;
```

**Out**

```javascript
// Debugger...
```

#### Var
**In**

```javascript
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

if (stripA === 'foo') {}
if (keepA === 'foo') {}

if (stripB === 'foo' && keepB === 'foo') {}

keepA = stripA;
keepB = stripB && keepB;
```

**Out**

```javascript

const keepA = 'foo';

let keepB;

keepB = 'foo';

export const keepC = {};

export { keepD };

export default { keepA };

console.log(keepA);

if (keepA === 'foo') {}

if (keepB === 'foo') {}

keepB = keepB;
```

#### Export
**In**

```javascript
export const stripA = {};
export const keepA = {};

export { stripB };
export { keepB };

export default { stripC, keepC };
```

**Out**

```javascript

export const keepA = {};

export { keepB };

export default { keepC };
```

#### Import
**In**

```javascript
import { fsA } from "stripA";
import { fkA } from "keepA";

import fsB from "stripB";
import fkB from "keepB";

import { fsCProxy as fsC } from "stripC";
import { fkCProxy as fkC } from "keepC";

import "stripD";
import "keepD";
```

**Out**

```javascript

import { fkA } from "keepA";

import fkB from "keepB";

import { fkCProxy as fkC } from "keepC";

import "keepD";
```

#### Function
**In**

```javascript
function stripA () {}
function keepA () {}
const keepB = function stripB () {};

stripA();
console.keepC('foo');
console.keepC.stripC('foo');
console.stripD('bar');
console.stripD.keepD('bar');
```

**Out**

```javascript

function keepA() {}
const keepB;

console.keepC('foo');

console.stripD.keepD('bar');
```

## Installation

```sh
npm install --save-dev babel-plugin-remove-code
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    ["remove-code", {
        "debugger": true,
        "var": ["stripA", "stripB", "stripC", "stripD"],
        "export": ["stripA", "stripB", "stripC"],
        "import": ["stripA", "stripB", "stripC", "stripD"],
        "function": ["stripA", "stripB", "stripC", "stripD"]
    }]
  ]
}
```
