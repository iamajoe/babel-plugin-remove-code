'use strict';

import { getRightPath } from '../utils.js';

const ACTUAL_TYPE = ['ExpressionStatement'];

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
    if (opts.indexOf(path.node.name) === -1) { return; }

    const rightPath = getRightPath(path, ACTUAL_TYPE);

    // Lets check if really is a function
    // TODO: ...

    rightPath && rightPath.remove();
};

// -----------------------------------------
// Export

export { remove };
