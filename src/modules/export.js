'use strict';

import { remove as generalRemove } from '../utils.js';

const ACTUAL_TYPE = ['ExportNamedDeclaration'];
// TODO: ExportDefaultDeclaration

// -----------------------------------------
// Functions

/**
 * Remove path
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path) => generalRemove(t, opts, path, ACTUAL_TYPE);

// -----------------------------------------
// Export

export { remove };
