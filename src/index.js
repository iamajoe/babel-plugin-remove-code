'use strict';

import { remove as removeDebugger } from './modules/debugger.js';
import { remove as removeFunction } from './modules/function.js';
import { remove as removeAssign } from './modules/assign.js';
import { remove as removeVar } from './modules/var.js';
import { remove as removeExport } from './modules/export.js';
import { remove as removeImport } from './modules/import.js';
// import { remove as removeConditions } from './modules/condition.js';

// -----------------------------------------
// Functions

const proxyVar = (t, opts = [], path) => opts.length && removeVar(t, opts, path);
const proxyFunc = (t, opts = [], path) => opts.length && removeFunction(t, opts, path);
const proxyDebugger = (t, opts, path) => opts && removeDebugger(t, opts, path);
const proxyAssign = (t, opts = [], path) => opts.length && removeAssign(t, opts, path);
const proxyExport = (t, opts = [], path) => opts.length && removeExport(t, opts, path);
const proxyImport = (t, opts = [], path) => opts.length && removeImport(t, opts, path);

// -----------------------------------------
// Export

export default function ({ types: t }) {
    return {
        visitor: {
            Identifier(path) {
                const varArr = this.opts.var || [];
                const funcArr = this.opts.function || [];
                const assignArr = this.opts.assign || [];
                const exportArr = this.opts.export || [];


                // Vars related
                proxyAssign(t, assignArr.concat(varArr), path);
                proxyExport(t, exportArr.concat(varArr), path);
                // removeConditions(t, this.opts.var, path);
                proxyVar(t, varArr, path);

                proxyFunc(t, funcArr, path);
                // TODO: What about empty vars? Or unset vars?
            },
            Literal(path) {
                const importArr = this.opts.import || [];
                proxyImport(t, importArr, path);
            },
            DebuggerStatement(path) {
                proxyDebugger(t, this.opts.debugger, path);
            }
        }
    };
}
