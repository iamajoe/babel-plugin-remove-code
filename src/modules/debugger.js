'use strict';

import { goUp } from '../utils.js';

const ACTUAL_TYPE = ['DebuggerStatement'];

// -----------------------------------------
// Functions

/**
 * Remove vars
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts, path) => {
    const actualPath = goUp(path, ACTUAL_TYPE);
    actualPath && actualPath.remove();
};

// -----------------------------------------
// Export

export { remove };
