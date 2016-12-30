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
```

**Out**

```javascript

const keepA = 'foo';

const keepBPattern = 'foo';

let keepC;

let keepFPattern;

keepC = 'foo';

keepFPattern = 'foo';

export const keepG = {};

export const keepHPattern = {};

export { keepD };

export { keepIPattern };

export default { keepA, keepBPattern };

console.log(keepA);

console.log(keepBPattern);

if (keepA === 'foo') {}

if (keepBPattern === 'foo') {}

if (keepC === 'foo') {}
if (keepFPattern === 'foo') {}

keepB = keepB;
```

#### Export
**In**

```javascript
export const stripA = {};
export const keepA = {};
export const stripBPattern = {};
export const keepBPattern = {};

export { stripC };
export { keepC };
export { stripDPattern };
export { keepDPattern };

export default { stripE, keepE, stripFPattern, keepFPattern };
```

**Out**

```javascript

export const keepA = {};

export const keepBPattern = {};

export { keepC };

export { keepDPattern };

export default { keepE, keepFPattern };
```

#### Import
**In**

```javascript
import { fsA } from "stripA";
import { fkA } from "keepA";
import { fsB } from "stripBPattern";
import { fkB } from "keepBPattern";
fsB('foo');
fkB('foo');

import fsC from "stripC";
import fkC from "keepC";
console.log(fsC);
console.log(fkC);

import fsD from "stripDPattern";
import fkD from "keepDPattern";
const fsDVar = fsD;
const fkDVar = fkD;

import { fsEProxy as fsE } from "stripE";
import { fkEProxy as fkE } from "keepE";
import { fsFProxy as fsF } from "stripFPattern";
import { fkFProxy as fkF } from "keepFPattern";

import "stripG";
import "keepG";
import "stripHPattern";
import "keepHPattern";

const keepI = fsF(fkF());
const keepJ = fkF(fsF());
```

**Out**

```javascript

import { fkA } from "keepA";

import { fkB } from "keepBPattern";

fkB('foo');

import fkC from "keepC";

console.log(fkC);

import fkD from "keepDPattern";

const fkDVar = fkD;

import { fkEProxy as fkE } from "keepE";

import { fkFProxy as fkF } from "keepFPattern";

import "keepG";

import "keepHPattern";

const keepI;
const keepJ = fkF();
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

stripA(keepC());
keepC(stripA());
```

**Out**

```javascript

function keepA() {}
const keepB;

console.keepC('foo');

keepC();
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
        "var": ["pattern"],
        "export": ["pattern"],
        "import": ["pattern"],
        "function": ["pattern"]
    }]
  ]
}
```

**Note:**
Regex patterns work but the `.` is escaped.
