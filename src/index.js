'use strict';

import { remove as removeDebugger } from './modules/debugger.js';
import { remove as removeFunction, removeByArg as removeFunctionByArg } from './modules/function.js';
import { remove as removeVar } from './modules/var.js';
import { remove as removeExport } from './modules/export.js';
import { remove as removeImport } from './modules/import.js';

// -----------------------------------------
// Functions

// -----------------------------------------
// Export

export default function ({ types: t }) {
    return {
        visitor: {
            Identifier(path) {
                // const varArr = this.opts.var || [];
                // const funcArr = this.opts.function || [];
                // const assignArr = this.opts.assign || [];
                // const exportArr = this.opts.export || [];

                // Vars related
                // proxyAssign(t, assignArr.concat(varArr), path);
                // proxyExport(t, exportArr.concat(varArr), path);
                // removeConditions(t, this.opts.var, path);
                // proxyVar(t, varArr, path);

                // proxyFunc(t, funcArr, path);
                // TODO: What about empty vars? Or unset vars?
            },
            // Vars
            VariableDeclarator(path) {
                const opts = this.opts.var || [];
                opts.length && removeVar(t, opts, path);
            },
            AssignmentExpression(path) {
                const opts = this.opts.var || [];
                opts.length && removeVar(t, opts, path);
            },
            // Debugger
            DebuggerStatement(path) {
                const opts = this.opts.debugger;
                opts && removeDebugger(t, opts, path);
            },
            // Imports
            ImportDeclaration(path) {
                const opts = this.opts.import || [];
                opts.length && removeImport(t, opts, path);
            },
            // Exports
            ExportDefaultDeclaration(path) {
                let opts = this.opts.export || [];
                opts = opts.concat(this.opts.var || []); // Vars references

                opts.length && removeExport(t, opts, path);
            },
            ExportNamedDeclaration(path) {
                let opts = this.opts.export || [];
                opts = opts.concat(this.opts.var || []); // Vars references

                opts.length && removeExport(t, opts, path);
            },
            // Functions
            CallExpression(path) {
                let opts = this.opts.function || [];
                opts.length && removeFunction(t, opts, path);

                opts = this.opts.var || []; // Vars references
                opts.length && removeFunctionByArg(t, opts, path);
            },
            FunctionDeclaration(path) {
                const opts = this.opts.function || [];
                opts.length && removeFunction(t, opts, path);
            },
            FunctionExpression(path) {
                const opts = this.opts.function || [];
                opts.length && removeFunction(t, opts, path);
            }
        }
    };
}
