'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            // TODO: What about empty vars? Or unset vars?
            // Vars
            VariableDeclarator: function VariableDeclarator(path) {
                proceed(t, this.opts.var, path, _var.remove);
            },
            AssignmentExpression: function AssignmentExpression(path) {
                proceed(t, this.opts.var, path, _var.remove);
            },
            LogicalExpression: function LogicalExpression(path) {
                proceed(t, this.opts.var, path, _var.remove);
            },
            BinaryExpression: function BinaryExpression(path) {
                proceed(t, this.opts.var, path, _var.remove);
            },

            // Debugger
            DebuggerStatement: function DebuggerStatement(path) {
                var opts = this.opts.debugger;
                opts && (0, _debugger.remove)(t, opts, path);
            },

            // Imports
            ImportDeclaration: function ImportDeclaration(path) {
                proceed(t, this.opts.import, path, _import.remove);
            },

            // Exports
            ExportDefaultDeclaration: function ExportDefaultDeclaration(path) {
                proceed(t, [].concat(this.opts.export, this.opts.var), path, _export.remove);
            },
            ExportNamedDeclaration: function ExportNamedDeclaration(path) {
                proceed(t, [].concat(this.opts.export, this.opts.var), path, _export.remove);
            },

            // Functions
            CallExpression: function CallExpression(path) {
                proceed(t, this.opts.function, path, _function.remove);
                proceed(t, this.opts.var, path, _function.removeByArg);
            },
            FunctionDeclaration: function FunctionDeclaration(path) {
                proceed(t, this.opts.function, path, _function.remove);
            },
            FunctionExpression: function FunctionExpression(path) {
                proceed(t, this.opts.function, path, _function.remove);
            }
        }
    };
};

var _debugger = require('./modules/debugger.js');

var _function = require('./modules/function.js');

var _var = require('./modules/var.js');

var _export = require('./modules/export.js');

var _import = require('./modules/import.js');

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
var proceed = function proceed(t) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var path = arguments[2];
    var fn = arguments[3];

    var checkedOpts = opts.filter(function (val) {
        return !!val;
    });
    checkedOpts.length && fn(t, checkedOpts, path);
};

// -----------------------------------------
// Export
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ0IiwidHlwZXMiLCJ2aXNpdG9yIiwiVmFyaWFibGVEZWNsYXJhdG9yIiwicGF0aCIsInByb2NlZWQiLCJvcHRzIiwidmFyIiwiQXNzaWdubWVudEV4cHJlc3Npb24iLCJMb2dpY2FsRXhwcmVzc2lvbiIsIkJpbmFyeUV4cHJlc3Npb24iLCJEZWJ1Z2dlclN0YXRlbWVudCIsImRlYnVnZ2VyIiwiSW1wb3J0RGVjbGFyYXRpb24iLCJpbXBvcnQiLCJFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24iLCJjb25jYXQiLCJleHBvcnQiLCJFeHBvcnROYW1lZERlY2xhcmF0aW9uIiwiQ2FsbEV4cHJlc3Npb24iLCJmdW5jdGlvbiIsIkZ1bmN0aW9uRGVjbGFyYXRpb24iLCJGdW5jdGlvbkV4cHJlc3Npb24iLCJmbiIsImNoZWNrZWRPcHRzIiwiZmlsdGVyIiwidmFsIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2tCQTJCZSxnQkFBd0I7QUFBQSxRQUFMQSxDQUFLLFFBQVpDLEtBQVk7O0FBQ25DLFdBQU87QUFDSEMsaUJBQVM7QUFDTDtBQUNBO0FBQ0FDLDhCQUhLLDhCQUdjQyxJQUhkLEVBR29CO0FBQ3JCQyx3QkFBUUwsQ0FBUixFQUFXLEtBQUtNLElBQUwsQ0FBVUMsR0FBckIsRUFBMEJILElBQTFCO0FBQ0gsYUFMSTtBQU1MSSxnQ0FOSyxnQ0FNZ0JKLElBTmhCLEVBTXNCO0FBQ3ZCQyx3QkFBUUwsQ0FBUixFQUFXLEtBQUtNLElBQUwsQ0FBVUMsR0FBckIsRUFBMEJILElBQTFCO0FBQ0gsYUFSSTtBQVNMSyw2QkFUSyw2QkFTYUwsSUFUYixFQVNtQjtBQUNwQkMsd0JBQVFMLENBQVIsRUFBVyxLQUFLTSxJQUFMLENBQVVDLEdBQXJCLEVBQTBCSCxJQUExQjtBQUNILGFBWEk7QUFZTE0sNEJBWkssNEJBWVlOLElBWlosRUFZa0I7QUFDbkJDLHdCQUFRTCxDQUFSLEVBQVcsS0FBS00sSUFBTCxDQUFVQyxHQUFyQixFQUEwQkgsSUFBMUI7QUFDSCxhQWRJOztBQWVMO0FBQ0FPLDZCQWhCSyw2QkFnQmFQLElBaEJiLEVBZ0JtQjtBQUNwQixvQkFBTUUsT0FBTyxLQUFLQSxJQUFMLENBQVVNLFFBQXZCO0FBQ0FOLHdCQUFRLHNCQUFlTixDQUFmLEVBQWtCTSxJQUFsQixFQUF3QkYsSUFBeEIsQ0FBUjtBQUNILGFBbkJJOztBQW9CTDtBQUNBUyw2QkFyQkssNkJBcUJhVCxJQXJCYixFQXFCbUI7QUFDcEJDLHdCQUFRTCxDQUFSLEVBQVcsS0FBS00sSUFBTCxDQUFVUSxNQUFyQixFQUE2QlYsSUFBN0I7QUFDSCxhQXZCSTs7QUF3Qkw7QUFDQVcsb0NBekJLLG9DQXlCb0JYLElBekJwQixFQXlCMEI7QUFDM0JDLHdCQUFRTCxDQUFSLEVBQVcsR0FBR2dCLE1BQUgsQ0FBVSxLQUFLVixJQUFMLENBQVVXLE1BQXBCLEVBQTRCLEtBQUtYLElBQUwsQ0FBVUMsR0FBdEMsQ0FBWCxFQUF1REgsSUFBdkQ7QUFDSCxhQTNCSTtBQTRCTGMsa0NBNUJLLGtDQTRCa0JkLElBNUJsQixFQTRCd0I7QUFDekJDLHdCQUFRTCxDQUFSLEVBQVcsR0FBR2dCLE1BQUgsQ0FBVSxLQUFLVixJQUFMLENBQVVXLE1BQXBCLEVBQTRCLEtBQUtYLElBQUwsQ0FBVUMsR0FBdEMsQ0FBWCxFQUF1REgsSUFBdkQ7QUFDSCxhQTlCSTs7QUErQkw7QUFDQWUsMEJBaENLLDBCQWdDVWYsSUFoQ1YsRUFnQ2dCO0FBQ2pCQyx3QkFBUUwsQ0FBUixFQUFXLEtBQUtNLElBQUwsQ0FBVWMsUUFBckIsRUFBK0JoQixJQUEvQjtBQUNBQyx3QkFBUUwsQ0FBUixFQUFXLEtBQUtNLElBQUwsQ0FBVUMsR0FBckIsRUFBMEJILElBQTFCO0FBQ0gsYUFuQ0k7QUFvQ0xpQiwrQkFwQ0ssK0JBb0NlakIsSUFwQ2YsRUFvQ3FCO0FBQ3RCQyx3QkFBUUwsQ0FBUixFQUFXLEtBQUtNLElBQUwsQ0FBVWMsUUFBckIsRUFBK0JoQixJQUEvQjtBQUNILGFBdENJO0FBdUNMa0IsOEJBdkNLLDhCQXVDY2xCLElBdkNkLEVBdUNvQjtBQUNyQkMsd0JBQVFMLENBQVIsRUFBVyxLQUFLTSxJQUFMLENBQVVjLFFBQXJCLEVBQStCaEIsSUFBL0I7QUFDSDtBQXpDSTtBQUROLEtBQVA7QUE2Q0gsQzs7QUF2RUQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFRQSxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ0wsQ0FBRCxFQUE0QjtBQUFBLFFBQXhCTSxJQUF3Qix1RUFBakIsRUFBaUI7QUFBQSxRQUFiRixJQUFhO0FBQUEsUUFBUG1CLEVBQU87O0FBQ3hDLFFBQU1DLGNBQWNsQixLQUFLbUIsTUFBTCxDQUFZO0FBQUEsZUFBTyxDQUFDLENBQUNDLEdBQVQ7QUFBQSxLQUFaLENBQXBCO0FBQ0FGLGdCQUFZRyxNQUFaLElBQXNCSixHQUFHdkIsQ0FBSCxFQUFNd0IsV0FBTixFQUFtQnBCLElBQW5CLENBQXRCO0FBQ0gsQ0FIRDs7QUFLQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyByZW1vdmUgYXMgcmVtb3ZlRGVidWdnZXIgfSBmcm9tICcuL21vZHVsZXMvZGVidWdnZXIuanMnO1xuaW1wb3J0IHsgcmVtb3ZlIGFzIHJlbW92ZUZ1bmN0aW9uLCByZW1vdmVCeUFyZyBhcyByZW1vdmVGdW5jdGlvbkJ5QXJnIH0gZnJvbSAnLi9tb2R1bGVzL2Z1bmN0aW9uLmpzJztcbmltcG9ydCB7IHJlbW92ZSBhcyByZW1vdmVWYXIgfSBmcm9tICcuL21vZHVsZXMvdmFyLmpzJztcbmltcG9ydCB7IHJlbW92ZSBhcyByZW1vdmVFeHBvcnQgfSBmcm9tICcuL21vZHVsZXMvZXhwb3J0LmpzJztcbmltcG9ydCB7IHJlbW92ZSBhcyByZW1vdmVJbXBvcnQgfSBmcm9tICcuL21vZHVsZXMvaW1wb3J0LmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIFByb2NlZWQgd2l0aCB0aGUgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdFxuICogQHBhcmFtIHthcnJheX0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKi9cbmNvbnN0IHByb2NlZWQgPSAodCwgb3B0cyA9IFtdLCBwYXRoLCBmbikgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRPcHRzID0gb3B0cy5maWx0ZXIodmFsID0+ICEhdmFsKTtcbiAgICBjaGVja2VkT3B0cy5sZW5ndGggJiYgZm4odCwgY2hlY2tlZE9wdHMsIHBhdGgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyB0eXBlczogdCB9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmlzaXRvcjoge1xuICAgICAgICAgICAgLy8gVE9ETzogV2hhdCBhYm91dCBlbXB0eSB2YXJzPyBPciB1bnNldCB2YXJzP1xuICAgICAgICAgICAgLy8gVmFyc1xuICAgICAgICAgICAgVmFyaWFibGVEZWNsYXJhdG9yKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBwcm9jZWVkKHQsIHRoaXMub3B0cy52YXIsIHBhdGgsIHJlbW92ZVZhcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgQXNzaWdubWVudEV4cHJlc3Npb24ocGF0aCkge1xuICAgICAgICAgICAgICAgIHByb2NlZWQodCwgdGhpcy5vcHRzLnZhciwgcGF0aCwgcmVtb3ZlVmFyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBMb2dpY2FsRXhwcmVzc2lvbihwYXRoKSB7XG4gICAgICAgICAgICAgICAgcHJvY2VlZCh0LCB0aGlzLm9wdHMudmFyLCBwYXRoLCByZW1vdmVWYXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEJpbmFyeUV4cHJlc3Npb24ocGF0aCkge1xuICAgICAgICAgICAgICAgIHByb2NlZWQodCwgdGhpcy5vcHRzLnZhciwgcGF0aCwgcmVtb3ZlVmFyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBEZWJ1Z2dlclxuICAgICAgICAgICAgRGVidWdnZXJTdGF0ZW1lbnQocGF0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLm9wdHMuZGVidWdnZXI7XG4gICAgICAgICAgICAgICAgb3B0cyAmJiByZW1vdmVEZWJ1Z2dlcih0LCBvcHRzLCBwYXRoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBJbXBvcnRzXG4gICAgICAgICAgICBJbXBvcnREZWNsYXJhdGlvbihwYXRoKSB7XG4gICAgICAgICAgICAgICAgcHJvY2VlZCh0LCB0aGlzLm9wdHMuaW1wb3J0LCBwYXRoLCByZW1vdmVJbXBvcnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIEV4cG9ydHNcbiAgICAgICAgICAgIEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbihwYXRoKSB7XG4gICAgICAgICAgICAgICAgcHJvY2VlZCh0LCBbXS5jb25jYXQodGhpcy5vcHRzLmV4cG9ydCwgdGhpcy5vcHRzLnZhciksIHBhdGgsIHJlbW92ZUV4cG9ydCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRXhwb3J0TmFtZWREZWNsYXJhdGlvbihwYXRoKSB7XG4gICAgICAgICAgICAgICAgcHJvY2VlZCh0LCBbXS5jb25jYXQodGhpcy5vcHRzLmV4cG9ydCwgdGhpcy5vcHRzLnZhciksIHBhdGgsIHJlbW92ZUV4cG9ydCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gRnVuY3Rpb25zXG4gICAgICAgICAgICBDYWxsRXhwcmVzc2lvbihwYXRoKSB7XG4gICAgICAgICAgICAgICAgcHJvY2VlZCh0LCB0aGlzLm9wdHMuZnVuY3Rpb24sIHBhdGgsIHJlbW92ZUZ1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICBwcm9jZWVkKHQsIHRoaXMub3B0cy52YXIsIHBhdGgsIHJlbW92ZUZ1bmN0aW9uQnlBcmcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEZ1bmN0aW9uRGVjbGFyYXRpb24ocGF0aCkge1xuICAgICAgICAgICAgICAgIHByb2NlZWQodCwgdGhpcy5vcHRzLmZ1bmN0aW9uLCBwYXRoLCByZW1vdmVGdW5jdGlvbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRnVuY3Rpb25FeHByZXNzaW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBwcm9jZWVkKHQsIHRoaXMub3B0cy5mdW5jdGlvbiwgcGF0aCwgcmVtb3ZlRnVuY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==