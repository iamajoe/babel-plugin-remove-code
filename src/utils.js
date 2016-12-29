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
        if (types.indexOf(rightPath.type) !== -1 && !rightPath.removed) {
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
    let rightPath = path || {};
    let i = 0;

    // Lets get the expression statement
    while (types.indexOf(rightPath.type) === -1) {
        // We need to break if we've gone too far
        if (max === i || !rightPath.type) {
            break;
        }

        // Lets get the next one
        rightPath = rightPath.parentPath || {};

        // Set a max of iteractions
        i += 1;
    }

    return rightPath.type && !rightPath.removed && rightPath || undefined;
};

/**
 * Gets member expression keys
 *
 * @param {object} path
 * @returns {array}
 */
const getObjItem = (path) => {
    let arr = [];
    let toCheck;

    if (!path) { return arr; }

    // For the identifier likes...
    arr = (path.type === 'Identifier') ? [path.name || path.node.name] : arr;

    // Lets check under other possible keys
    toCheck = path.object || path.node && path.node.object;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.property || path.node && path.node.property;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.id || path.node && path.node.id;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.left || path.node && path.node.left;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.right || path.node && path.node.right;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    return arr;
};

/**
 * Gets property
 *
 * @param {object} opts
 * @param {object} path
 * @param {array} properties
 * @returns
 */
const getsArrItem = (opts, path, properties) => {
    let rightProperty;

    // Go through each property
    for (let i = 0; i < properties.length; i += 1) {
        const property = properties[i];
        let toCheck;

        toCheck = (property.type === 'Identifier') && property;
        toCheck = toCheck || property.node.value && property.get('value');
        toCheck = toCheck || property.node.local && property.get('local');
        toCheck = toCheck || property.node.id && property.get('id');
        toCheck = toCheck && toCheck.node && toCheck.node.name;

        if (opts.indexOf(toCheck) === -1) {
            continue;
        }

        // It was found!
        rightProperty = (properties.length > 1) ? property : path;
    }

    return rightProperty;
};

/**
 * Check for name in options
 *
 * @param {array} opts
 * @param {object} path
 * @returns {path}
 */
const parsePath = (opts = [], path) => {
    if (!opts.length || !path) { return undefined; }

    const optsArr = opts.map((val) => {
        const newArr = val.split('.').reverse();

        // Check if actually exists something with the path name
        const check = newArr.filter(cVal => cVal.indexOf(path.node.name || path.node.value) !== -1);

        // No need to go further if it isn't an object
        if (check.length && newArr.length === 1) {
            return path;
        } else if (!check.length) {
            return false;
        }

        // We need to check for possible objects now...
        // Lets get the root MemberExpression
        const actualPath = goUpRoot(path, ['MemberExpression'], newArr.length + 1);
        const objKeys = getObjItem(actualPath);

        // It may not have keys for some reason
        if (!objKeys.length) { return false; }

        // Lets see if the object is the same
        const name = path.node.name || path.node.value;
        const isIt = name === objKeys[0] && newArr.join('.') === objKeys.join('.');
        return isIt ? actualPath : false;
    }).filter(val => !!val);

    // Return the actual path
    const actualPath = optsArr[0];
    return actualPath && !actualPath.removed && actualPath || undefined;
};

/**
 * Remove of general
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path, actualType = []) => {
    const actualPath = goUp(parsePath(opts, path), actualType);

    // Now lets actually remove
    actualPath && !actualPath.removed && actualPath.remove();
};

// -----------------------------------------
// Export

export { goUp, goUpRoot, parsePath, getObjItem, getsArrItem, remove };
