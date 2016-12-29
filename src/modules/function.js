'use strict';

import { remove as removeUtil } from '../utils.js';

const ACTUAL_TYPE = ['FunctionExpression', 'FunctionDeclaration', 'CallExpression'];

// -----------------------------------------
// Functions

/**
 * Remove vars
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path) => removeUtil(t, opts, path, ACTUAL_TYPE);

// -----------------------------------------
// Export

export { remove };
