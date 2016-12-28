'use strict';

// -----------------------------------------
// Functions

/**
 * Goes up to find a type
 *
 * @param {object} path
 * @param {array} types
 * @param {int} max
 * @returns {object}
 */
const goUpRoot = (path, types = [], max = 5) => {
    let rightPath = path;
    let lastOfType = undefined;

    // Lets get the expression statement
    for (let i = 0; i < max; i += 1) {
        rightPath = rightPath.parentPath;

        if (!rightPath || !rightPath.type) {
            break;
        }

        // Lets check for the type
        if (types.indexOf(rightPath.type) !== -1) {
            lastOfType = rightPath;
        }

        // Set a max of iteractions
        i += 1;
    }

    return lastOfType;
};

/**
 * Goes up to find a type
 *
 * @param {object} path
 * @param {array} types
 * @param {int} max
 * @returns {object}
 */
const goUp = (path, types = [], max = 5) => {
    let rightPath = path;
    let i = 0;

    // Lets get the expression statement
    while (types.indexOf(rightPath.type) === -1) {
        // We need to break if we've gone too far
        if (max === i || !rightPath || !rightPath.type) {
            rightPath = undefined;
            break;
        }

        // Lets get the next one
        rightPath = rightPath.parentPath;

        // Set a max of iteractions
        i += 1;
    }

    return rightPath;
};

/**
 * Gets member expression keys
 *
 * @param {object} path
 * @returns {array}
 */
const getMemberExpressionKeys = (path) => {
    let checkingPath = path || {};
    const checkedObj = [];

    // Lets iterate through the object to check if all keys are set
    while (checkingPath.type === 'MemberExpression' || checkingPath.type === 'Identifier') {
        if (checkingPath.type === 'MemberExpression') {
            // Is it an object inside?
            const property = checkingPath.property || checkingPath.node.property;
            (property.type === 'Identifier') && checkedObj.push(property.name);

            // The new object to iterate through
            checkingPath = checkingPath.object || checkingPath.node.object || {};
        } else if (checkingPath.type === 'Identifier') {
            // Maybe already an identifier
            checkedObj.push(checkingPath.name);

            // So that it doesn't continue any longer
            checkingPath = {};
        }
    }

    return checkedObj;
};

/**
 * Check for name in options
 *
 * @param {array} opts
 * @param {object} path
 * @returns
 */
const parsePath = (opts, path) => {
    const optsArr = opts.map((val) => {
        const newArr = val.split('.').reverse();

        // Check if actually exists something with the path name
        const check = newArr.filter(cVal => cVal.indexOf(path.node.name) !== -1);

        // No need to go further if it isn't an object
        if (check.length && newArr.length === 1) {
            return path;
        } else if (!check.length) {
            return false;
        }

        // We need to check for possible objects now...
        // Lets get the root MemberExpression
        const actualPath = goUpRoot(path, ['MemberExpression'], newArr.length + 1);
        const objKeys = getMemberExpressionKeys(actualPath);

        // Lets see if the object is the same
        const isIt = path.node.name === objKeys[0] && newArr.join('.') === objKeys.join('.');
        return isIt ? actualPath : false;
    }).filter(val => !!val);

    // Return the actual path
    return optsArr[0];
};

/**
 * Remove of general
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path, actualType) => {
    if (opts.indexOf(path.node.name) === -1) { return; }

    // Lets remove the path
    const rightPath = goUp(path, actualType);
    rightPath && rightPath.remove();
};

// -----------------------------------------
// Export

export { goUp, goUpRoot, parsePath, getMemberExpressionKeys, remove };
