'use strict';

import { remove as removeDebugger } from './modules/debugger.js';
// import { remove as removeVar } from './modules/var.js';
import { remove as removeFunction } from './modules/function.js';
// import { remove as removeConditions } from './modules/condition.js';
// import { remove as removeExport } from './modules/export.js';

// -----------------------------------------
// Functions

/**
 * Remove functions
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 * @returns
 */
const proxyFunc = (t, opts = [], path) => {
    if (!opts.length) { return; }
    removeFunction(t, opts, path);
};

/**
 * Remove debugger
 *
 * @param {object} t
 * @param {boolean} opts
 * @param {object} path
 * @returns
 */
const proxyDebugger = (t, opts = [], path) => {
    opts && removeDebugger(t, opts, path);
};

// -----------------------------------------
// Export

export default function ({ types: t }) {
    return {
        visitor: {
            Identifier(path) {
                const varArr = this.opts.var || [];
                const funcArr = this.opts.function || [];

            //     if (!this.opts.var || !this.opts.var.length) { return; }

            //     removeExport(t, this.opts.var, path);
            //     removeConditions(t, this.opts.var, path);
            //     removeVar(t, this.opts.var, path);

                proxyFunc(t, funcArr.concat(varArr), path);
            },
            DebuggerStatement(path) {
                proxyDebugger(t, this.opts.debugger, path);
            }
            // ExportNamedDeclaration
            // FunctionExpression(path) { func(t, this.opts.function, path); },
            // FunctionDeclaration(path) { func(this.opts.function, path); },
            // CallExpression(path) { func(t, this.opts.function, path); }
        }
    };
}
