'use strict';

// -----------------------------------------
// Functions

/**
 * Remove debugger
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts, path) => opts && path && !path.removed && path.remove();

// -----------------------------------------
// Export

export { remove };
