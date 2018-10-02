'use strict';

// -----------------------------------------
// Functions

/**
 * Check if patterns matches
 *
 * @param {array} data
 * @param {string} pattern
 * @returns {boolean}
 */
const matches = (data, pattern) => {
    if (!pattern || !pattern.length || !data || !data.length) { return false; }

    const filter = data.filter(val => {
        const newPattern = val.replace(/\./g, '\.');
        const reg = new RegExp(newPattern, 'g');
        const is = reg.test(pattern);

        return is;
    });

    return !!filter[0];
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
    if (path.type === 'Identifier') {
        arr = [path.name || path.node.name];
    } else if (path.type === 'StringLiteral') {
        arr = [path.value];
    }

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
 * @returns {array}
 */
const getsArrItem = (opts, path, properties) => {
    const rightProperties = [];

    // Go through each property
    for (let i = 0; i < properties.length; i += 1) {
        const property = properties[i];
        let toCheck;

        toCheck = (property.type === 'Identifier') && property;
        toCheck = toCheck || property.node.value && property.get('value');
        toCheck = toCheck || property.node.local && property.get('local');
        toCheck = toCheck || property.node.id && property.get('id');
        toCheck = toCheck && toCheck.node && toCheck.node.name;

        if (!matches(opts, toCheck)) {
            continue;
        }

        // It was found!
        rightProperties.push((properties.length > 1) ? property : path);
    }

    return rightProperties;
};

// -----------------------------------------
// Export

export { getObjItem, getsArrItem, matches };
