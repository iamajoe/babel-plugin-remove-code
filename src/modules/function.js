'use strict';

import { goUp, parsePath } from '../utils.js';

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
const remove = (t, opts = [], path) => {
    const parsedPath = parsePath(opts, path);
    const actualPath = parsedPath && goUp(parsedPath, ACTUAL_TYPE);

    // Now lets actually remove the function
    actualPath && actualPath.remove();
};

// -----------------------------------------
// Export

export { remove };
