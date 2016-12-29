'use strict';

// -----------------------------------------
// Functions

/**
 * Remove import
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path) => {
    const source = path && path.source || path && path.node.source;
    if (!source || !source.value) { return; }

    // It doesn't exist in the options
    if (opts.indexOf(source.value) === -1) { return; }

    !path.removed && path.remove();
};

// -----------------------------------------
// Export

export { remove };
