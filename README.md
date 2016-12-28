# babel-plugin-remove-code

> Remove any code from your project.

[![Build Status](https://travis-ci.org/Sendoushi/babel-plugin-remove-code.svg?branch=master)](https://travis-ci.org/sendoushi/babel-plugin-remove-code)

**Supported removals**

- [x] debugger
- [ ] var
- [ ] condition
- [ ] export
- [ ] assign
- [x] function
- [ ] module
- [ ] object key
- [ ] ???

## Example

**In**

```javascript
import { foo };
export const something = 'in';

export const foo = 'foo';

export const bar = 'bar';
export default { bar: 'bar' };

console.log('foo');

if (bar === "foo") { console.warn('bar'); }

let simple;
simple = 'foo';

debugger;
```

**Out**

```javascript
export const something = 'in';
let simple;
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
        "var": ["foo"],
        "debugger": true,
        "import": ["foo"],
        "export": ["bar"],
        "function": ["console.log"],
        "condition": ["bar === \"foo\""],
        "assign": ["simple"]
    }]
  ]
}
```
