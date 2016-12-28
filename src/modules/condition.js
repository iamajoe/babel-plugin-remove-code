'use strict';

import { getRightPath } from '../utils.js';

const ACTUAL_TYPE = ['BinaryExpression'];

// -----------------------------------------
// Functions

/**
 * Removes name by path
 *
 * @param {object} path
 */
const removePathByName = (path) => {
    // Lets get the expression statement
    let rightPath = getRightPath(path, ACTUAL_TYPE);

    if (!rightPath) { return; }

    if (rightPath.parentPath.type === 'IfStatement') {
        const ifStatement = rightPath.parentPath;

        // There won't be an expression inside so we can
        // safely remove the if statement
        if (ifStatement.node.test === rightPath.node) {
            rightPath = ifStatement;
        }
    } else if (rightPath.parentPath.type === 'LogicalExpression') {
        // const logicalExpression = rightPath.parentPath;
        // TODO: ...
        return;
    }

    // TODO: What about expression assignments like foo = bar && foo; ?
    // TODO: What about ternary ifs?

    // Finally lets remove it
    rightPath && rightPath.remove();
};

/**
 * Remove vars
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path) => {
    if (opts.indexOf(path.node.name) === -1) {
        return;
    }

    // Lets remove the path
    removePathByName(path);
};

// -----------------------------------------
// Export

export { remove };
