'use strict';

import { getObjItem } from '../utils.js';

// -----------------------------------------
// Functions

/**
 * Remove var
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path) => {
    if (!path) { return; }

    if (path.type === 'VariableDeclarator' || path.type === 'AssignmentExpression') {
        // It doesn't exist in the options
        const ids = getObjItem(path);
        if (opts.indexOf(ids.join('.')) === -1) { return; }

        !path.removed && path.remove();
    }
};

// -----------------------------------------
// Export

export { remove };
