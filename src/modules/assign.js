'use strict';

import { goUp, parsePath } from '../utils.js';

const ACTUAL_TYPE = ['AssignmentExpression', 'VariableDeclarator'];

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
    const actualPath = goUp(parsePath(opts, path), ACTUAL_TYPE) || {};

    // Lets check per type
    if (actualPath.type === 'AssignmentExpression') {
        // Lets check if it is the right assignment
        if (actualPath.node.left &&
            actualPath.node.left.type === 'Identifier' &&
            opts.indexOf(actualPath.node.left.name) !== -1) {
            actualPath.remove();
        }
    } else if (actualPath.type === 'VariableDeclarator') {
        // Remove any assignment
        actualPath.node.init = null;
    }
    // TODO: ...
    // actualPath.type === 'VariableDeclarator' && actualPath.node.init.remove();
};

// -----------------------------------------
// Export

export { remove };
