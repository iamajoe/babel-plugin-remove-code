'use strict';

import { getObjItem } from '../utils.js';

// -----------------------------------------
// Functions

/**
 * Is it either of the sides?
 *
 * @param {object} opts
 * @param {object} path
 * @param {string} leftKey
 * @param {string} rightKey
 * @returns {object}
 */
const isEitherSide = (opts, path, leftKey = 'left', rightKey = 'right') => {
    const left = path.get(leftKey);
    const right = path.get(rightKey);
    const idsLeft = getObjItem(left);
    const idsRight = getObjItem(right);

    return {
        isLeft: opts.indexOf(idsLeft.join('.')) !== -1,
        isRight: opts.indexOf(idsRight.join('.')) !== -1,
        left, right
    };
};

/**
 * Remove var
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path) => {
    if (!path) { return; }

    let toRemove;

    if (path.type === 'VariableDeclarator') {
        const isIt = isEitherSide(opts, path, 'id', 'init');
        if (!isIt.isLeft && !isIt.isRight) { return; }

        toRemove = path;
    } else if (path.type === 'AssignmentExpression') {
        const isIt = isEitherSide(opts, path);
        if (!isIt.isLeft && !isIt.isRight) { return; }

        toRemove = path;
    } else if (path.type === 'BinaryExpression') {
        const isIt = isEitherSide(opts, path);
        if (!isIt.isLeft && !isIt.isRight) { return; }

        toRemove = path;
    } else if (path.type === 'LogicalExpression') {
        const isIt = isEitherSide(opts, path);
        if (!isIt.isLeft && !isIt.isRight) { return; }

        toRemove = isIt.isLeft && isIt.left || isIt.isRight && isIt.right || undefined;
    }

    // We need to check if it is a IfStatement
    const parent = toRemove && toRemove.parentPath;
    if (parent && parent.type === 'IfStatement') {
        toRemove = parent;
    }

    toRemove && !toRemove.removed && toRemove.remove();
};

// -----------------------------------------
// Export

export { remove };
