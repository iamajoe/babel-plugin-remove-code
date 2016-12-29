'use strict';

import { remove as removeDebugger } from './modules/debugger.js';
import { remove as removeFunction, removeByArg as removeFunctionByArg } from './modules/function.js';
import { remove as removeVar } from './modules/var.js';
import { remove as removeExport } from './modules/export.js';
import { remove as removeImport } from './modules/import.js';

// -----------------------------------------
// Functions

/**
 * Proceed with the function
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 * @param {function} fn
 */
const proceed = (t, opts = [], path, fn) => {
    const checkedOpts = opts.filter(val => !!val);
    checkedOpts.length && fn(t, checkedOpts, path);
};

// -----------------------------------------
// Export

export default function ({ types: t }) {
    return {
        visitor: {
            // TODO: What about empty vars? Or unset vars?
            // Vars
            VariableDeclarator(path) {
                proceed(t, this.opts.var, path, removeVar);
            },
            AssignmentExpression(path) {
                proceed(t, this.opts.var, path, removeVar);
            },
            LogicalExpression(path) {
                proceed(t, this.opts.var, path, removeVar);
            },
            BinaryExpression(path) {
                proceed(t, this.opts.var, path, removeVar);
            },
            // Debugger
            DebuggerStatement(path) {
                const opts = this.opts.debugger;
                opts && removeDebugger(t, opts, path);
            },
            // Imports
            ImportDeclaration(path) {
                proceed(t, this.opts.import, path, removeImport);
            },
            // Exports
            ExportDefaultDeclaration(path) {
                proceed(t, [].concat(this.opts.export, this.opts.var), path, removeExport);
            },
            ExportNamedDeclaration(path) {
                proceed(t, [].concat(this.opts.export, this.opts.var), path, removeExport);
            },
            // Functions
            CallExpression(path) {
                proceed(t, this.opts.function, path, removeFunction);
                proceed(t, this.opts.var, path, removeFunctionByArg);
            },
            FunctionDeclaration(path) {
                proceed(t, this.opts.function, path, removeFunction);
            },
            FunctionExpression(path) {
                proceed(t, this.opts.function, path, removeFunction);
            }
        }
    };
}
