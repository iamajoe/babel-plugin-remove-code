# babel-plugin-remove-code

> Remove any code from your project.

[![Build Status](https://travis-ci.org/Sendoushi/babel-plugin-remove-code.svg?branch=master)](https://travis-ci.org/sendoushi/babel-plugin-remove-code)

**Supported removals**

- [x] debugger
- [x] var
- [x] export
- [x] import
- [x] function
- [ ] ???

## Example

**In**

```javascript
// TODO: ...
```

**Out**

```javascript
// TODO: ...
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
        "var": ["stripA"],
        "debugger": true,
        "import": ["stripB"],
        "export": ["stripC"],
        "function": ["stripD"],
        "condition": ["stripE === \"foo\""],
        "assign": ["stripF"]
    }]
  ]
}
```
