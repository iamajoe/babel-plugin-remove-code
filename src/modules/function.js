'use strict';

import { getObjItem, getsArrItem } from '../utils.js';

// -----------------------------------------
// Functions

/**
 * Remove functions by argument
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 * @param {object} originalPath
 */
const removeByArg = (t, opts = [], path) => {
    if (!path || path.type !== 'CallExpression') { return; }

    // It doesn't exist in the options
    const args = path.get('arguments');

    // Now maybe we have something to remove!
    const toRemove = args.length && getsArrItem(opts, path, args);

    toRemove && !toRemove.removed && toRemove.remove();
};

/**
 * Remove functions
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 * @param {object} originalPath
 */
const remove = (t, opts = [], path) => {
    if (!path) { return; }

    // It doesn't exist in the options
    const pathHasIds = (path.type === 'CallExpression') ? path.get('callee') : path;
    const ids = getObjItem(pathHasIds);
    if (opts.indexOf(ids.join('.')) === -1) { return; }

    !path.removed && path.remove();
};

// -----------------------------------------
// Export

export { remove, removeByArg };
