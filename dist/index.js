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
                var opts = this.opts.var || [];
                opts.length && (0, _var.remove)(t, opts, path);
            },
            AssignmentExpression: function AssignmentExpression(path) {
                var opts = this.opts.var || [];
                opts.length && (0, _var.remove)(t, opts, path);
            },

            // Debugger
            DebuggerStatement: function DebuggerStatement(path) {
                var opts = this.opts.debugger;
                opts && (0, _debugger.remove)(t, opts, path);
            },

            // Imports
            ImportDeclaration: function ImportDeclaration(path) {
                var opts = this.opts.import || [];
                opts.length && (0, _import.remove)(t, opts, path);
            },

            // Exports
            ExportDefaultDeclaration: function ExportDefaultDeclaration(path) {
                var opts = this.opts.export || [];
                opts = opts.concat(this.opts.var || []); // Vars references

                opts.length && (0, _export.remove)(t, opts, path);
            },
            ExportNamedDeclaration: function ExportNamedDeclaration(path) {
                var opts = this.opts.export || [];
                opts = opts.concat(this.opts.var || []); // Vars references

                opts.length && (0, _export.remove)(t, opts, path);
            },

            // Functions
            CallExpression: function CallExpression(path) {
                var opts = this.opts.function || [];
                opts.length && (0, _function.remove)(t, opts, path);

                opts = this.opts.var || []; // Vars references
                opts.length && (0, _function.removeByArg)(t, opts, path);
            },
            FunctionDeclaration: function FunctionDeclaration(path) {
                var opts = this.opts.function || [];
                opts.length && (0, _function.remove)(t, opts, path);
            },
            FunctionExpression: function FunctionExpression(path) {
                var opts = this.opts.function || [];
                opts.length && (0, _function.remove)(t, opts, path);
            }
        }
    };
};

var _debugger = require('./modules/debugger.js');

var _function = require('./modules/function.js');

var _var = require('./modules/var.js');

var _export = require('./modules/export.js');

var _import = require('./modules/import.js');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ0IiwidHlwZXMiLCJ2aXNpdG9yIiwiVmFyaWFibGVEZWNsYXJhdG9yIiwicGF0aCIsIm9wdHMiLCJ2YXIiLCJsZW5ndGgiLCJBc3NpZ25tZW50RXhwcmVzc2lvbiIsIkRlYnVnZ2VyU3RhdGVtZW50IiwiZGVidWdnZXIiLCJJbXBvcnREZWNsYXJhdGlvbiIsImltcG9ydCIsIkV4cG9ydERlZmF1bHREZWNsYXJhdGlvbiIsImV4cG9ydCIsImNvbmNhdCIsIkV4cG9ydE5hbWVkRGVjbGFyYXRpb24iLCJDYWxsRXhwcmVzc2lvbiIsImZ1bmN0aW9uIiwiRnVuY3Rpb25EZWNsYXJhdGlvbiIsIkZ1bmN0aW9uRXhwcmVzc2lvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztrQkFjZSxnQkFBd0I7QUFBQSxRQUFMQSxDQUFLLFFBQVpDLEtBQVk7O0FBQ25DLFdBQU87QUFDSEMsaUJBQVM7QUFDTDtBQUNBO0FBQ0FDLDhCQUhLLDhCQUdjQyxJQUhkLEVBR29CO0FBQ3JCLG9CQUFNQyxPQUFPLEtBQUtBLElBQUwsQ0FBVUMsR0FBVixJQUFpQixFQUE5QjtBQUNBRCxxQkFBS0UsTUFBTCxJQUFlLGlCQUFVUCxDQUFWLEVBQWFLLElBQWIsRUFBbUJELElBQW5CLENBQWY7QUFDSCxhQU5JO0FBT0xJLGdDQVBLLGdDQU9nQkosSUFQaEIsRUFPc0I7QUFDdkIsb0JBQU1DLE9BQU8sS0FBS0EsSUFBTCxDQUFVQyxHQUFWLElBQWlCLEVBQTlCO0FBQ0FELHFCQUFLRSxNQUFMLElBQWUsaUJBQVVQLENBQVYsRUFBYUssSUFBYixFQUFtQkQsSUFBbkIsQ0FBZjtBQUNILGFBVkk7O0FBV0w7QUFDQUssNkJBWkssNkJBWWFMLElBWmIsRUFZbUI7QUFDcEIsb0JBQU1DLE9BQU8sS0FBS0EsSUFBTCxDQUFVSyxRQUF2QjtBQUNBTCx3QkFBUSxzQkFBZUwsQ0FBZixFQUFrQkssSUFBbEIsRUFBd0JELElBQXhCLENBQVI7QUFDSCxhQWZJOztBQWdCTDtBQUNBTyw2QkFqQkssNkJBaUJhUCxJQWpCYixFQWlCbUI7QUFDcEIsb0JBQU1DLE9BQU8sS0FBS0EsSUFBTCxDQUFVTyxNQUFWLElBQW9CLEVBQWpDO0FBQ0FQLHFCQUFLRSxNQUFMLElBQWUsb0JBQWFQLENBQWIsRUFBZ0JLLElBQWhCLEVBQXNCRCxJQUF0QixDQUFmO0FBQ0gsYUFwQkk7O0FBcUJMO0FBQ0FTLG9DQXRCSyxvQ0FzQm9CVCxJQXRCcEIsRUFzQjBCO0FBQzNCLG9CQUFJQyxPQUFPLEtBQUtBLElBQUwsQ0FBVVMsTUFBVixJQUFvQixFQUEvQjtBQUNBVCx1QkFBT0EsS0FBS1UsTUFBTCxDQUFZLEtBQUtWLElBQUwsQ0FBVUMsR0FBVixJQUFpQixFQUE3QixDQUFQLENBRjJCLENBRWM7O0FBRXpDRCxxQkFBS0UsTUFBTCxJQUFlLG9CQUFhUCxDQUFiLEVBQWdCSyxJQUFoQixFQUFzQkQsSUFBdEIsQ0FBZjtBQUNILGFBM0JJO0FBNEJMWSxrQ0E1Qkssa0NBNEJrQlosSUE1QmxCLEVBNEJ3QjtBQUN6QixvQkFBSUMsT0FBTyxLQUFLQSxJQUFMLENBQVVTLE1BQVYsSUFBb0IsRUFBL0I7QUFDQVQsdUJBQU9BLEtBQUtVLE1BQUwsQ0FBWSxLQUFLVixJQUFMLENBQVVDLEdBQVYsSUFBaUIsRUFBN0IsQ0FBUCxDQUZ5QixDQUVnQjs7QUFFekNELHFCQUFLRSxNQUFMLElBQWUsb0JBQWFQLENBQWIsRUFBZ0JLLElBQWhCLEVBQXNCRCxJQUF0QixDQUFmO0FBQ0gsYUFqQ0k7O0FBa0NMO0FBQ0FhLDBCQW5DSywwQkFtQ1ViLElBbkNWLEVBbUNnQjtBQUNqQixvQkFBSUMsT0FBTyxLQUFLQSxJQUFMLENBQVVhLFFBQVYsSUFBc0IsRUFBakM7QUFDQWIscUJBQUtFLE1BQUwsSUFBZSxzQkFBZVAsQ0FBZixFQUFrQkssSUFBbEIsRUFBd0JELElBQXhCLENBQWY7O0FBRUFDLHVCQUFPLEtBQUtBLElBQUwsQ0FBVUMsR0FBVixJQUFpQixFQUF4QixDQUppQixDQUlXO0FBQzVCRCxxQkFBS0UsTUFBTCxJQUFlLDJCQUFvQlAsQ0FBcEIsRUFBdUJLLElBQXZCLEVBQTZCRCxJQUE3QixDQUFmO0FBQ0gsYUF6Q0k7QUEwQ0xlLCtCQTFDSywrQkEwQ2VmLElBMUNmLEVBMENxQjtBQUN0QixvQkFBTUMsT0FBTyxLQUFLQSxJQUFMLENBQVVhLFFBQVYsSUFBc0IsRUFBbkM7QUFDQWIscUJBQUtFLE1BQUwsSUFBZSxzQkFBZVAsQ0FBZixFQUFrQkssSUFBbEIsRUFBd0JELElBQXhCLENBQWY7QUFDSCxhQTdDSTtBQThDTGdCLDhCQTlDSyw4QkE4Q2NoQixJQTlDZCxFQThDb0I7QUFDckIsb0JBQU1DLE9BQU8sS0FBS0EsSUFBTCxDQUFVYSxRQUFWLElBQXNCLEVBQW5DO0FBQ0FiLHFCQUFLRSxNQUFMLElBQWUsc0JBQWVQLENBQWYsRUFBa0JLLElBQWxCLEVBQXdCRCxJQUF4QixDQUFmO0FBQ0g7QUFqREk7QUFETixLQUFQO0FBcURILEM7O0FBbEVEOztBQUNBOztBQUNBOztBQUNBOztBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyByZW1vdmUgYXMgcmVtb3ZlRGVidWdnZXIgfSBmcm9tICcuL21vZHVsZXMvZGVidWdnZXIuanMnO1xuaW1wb3J0IHsgcmVtb3ZlIGFzIHJlbW92ZUZ1bmN0aW9uLCByZW1vdmVCeUFyZyBhcyByZW1vdmVGdW5jdGlvbkJ5QXJnIH0gZnJvbSAnLi9tb2R1bGVzL2Z1bmN0aW9uLmpzJztcbmltcG9ydCB7IHJlbW92ZSBhcyByZW1vdmVWYXIgfSBmcm9tICcuL21vZHVsZXMvdmFyLmpzJztcbmltcG9ydCB7IHJlbW92ZSBhcyByZW1vdmVFeHBvcnQgfSBmcm9tICcuL21vZHVsZXMvZXhwb3J0LmpzJztcbmltcG9ydCB7IHJlbW92ZSBhcyByZW1vdmVJbXBvcnQgfSBmcm9tICcuL21vZHVsZXMvaW1wb3J0LmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IHR5cGVzOiB0IH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB2aXNpdG9yOiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBXaGF0IGFib3V0IGVtcHR5IHZhcnM/IE9yIHVuc2V0IHZhcnM/XG4gICAgICAgICAgICAvLyBWYXJzXG4gICAgICAgICAgICBWYXJpYWJsZURlY2xhcmF0b3IocGF0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLm9wdHMudmFyIHx8IFtdO1xuICAgICAgICAgICAgICAgIG9wdHMubGVuZ3RoICYmIHJlbW92ZVZhcih0LCBvcHRzLCBwYXRoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBBc3NpZ25tZW50RXhwcmVzc2lvbihwYXRoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMub3B0cy52YXIgfHwgW107XG4gICAgICAgICAgICAgICAgb3B0cy5sZW5ndGggJiYgcmVtb3ZlVmFyKHQsIG9wdHMsIHBhdGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIERlYnVnZ2VyXG4gICAgICAgICAgICBEZWJ1Z2dlclN0YXRlbWVudChwYXRoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMub3B0cy5kZWJ1Z2dlcjtcbiAgICAgICAgICAgICAgICBvcHRzICYmIHJlbW92ZURlYnVnZ2VyKHQsIG9wdHMsIHBhdGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIEltcG9ydHNcbiAgICAgICAgICAgIEltcG9ydERlY2xhcmF0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5vcHRzLmltcG9ydCB8fCBbXTtcbiAgICAgICAgICAgICAgICBvcHRzLmxlbmd0aCAmJiByZW1vdmVJbXBvcnQodCwgb3B0cywgcGF0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gRXhwb3J0c1xuICAgICAgICAgICAgRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0cy5leHBvcnQgfHwgW107XG4gICAgICAgICAgICAgICAgb3B0cyA9IG9wdHMuY29uY2F0KHRoaXMub3B0cy52YXIgfHwgW10pOyAvLyBWYXJzIHJlZmVyZW5jZXNcblxuICAgICAgICAgICAgICAgIG9wdHMubGVuZ3RoICYmIHJlbW92ZUV4cG9ydCh0LCBvcHRzLCBwYXRoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFeHBvcnROYW1lZERlY2xhcmF0aW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0cy5leHBvcnQgfHwgW107XG4gICAgICAgICAgICAgICAgb3B0cyA9IG9wdHMuY29uY2F0KHRoaXMub3B0cy52YXIgfHwgW10pOyAvLyBWYXJzIHJlZmVyZW5jZXNcblxuICAgICAgICAgICAgICAgIG9wdHMubGVuZ3RoICYmIHJlbW92ZUV4cG9ydCh0LCBvcHRzLCBwYXRoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBGdW5jdGlvbnNcbiAgICAgICAgICAgIENhbGxFeHByZXNzaW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0cy5mdW5jdGlvbiB8fCBbXTtcbiAgICAgICAgICAgICAgICBvcHRzLmxlbmd0aCAmJiByZW1vdmVGdW5jdGlvbih0LCBvcHRzLCBwYXRoKTtcblxuICAgICAgICAgICAgICAgIG9wdHMgPSB0aGlzLm9wdHMudmFyIHx8IFtdOyAvLyBWYXJzIHJlZmVyZW5jZXNcbiAgICAgICAgICAgICAgICBvcHRzLmxlbmd0aCAmJiByZW1vdmVGdW5jdGlvbkJ5QXJnKHQsIG9wdHMsIHBhdGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEZ1bmN0aW9uRGVjbGFyYXRpb24ocGF0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLm9wdHMuZnVuY3Rpb24gfHwgW107XG4gICAgICAgICAgICAgICAgb3B0cy5sZW5ndGggJiYgcmVtb3ZlRnVuY3Rpb24odCwgb3B0cywgcGF0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRnVuY3Rpb25FeHByZXNzaW9uKHBhdGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5vcHRzLmZ1bmN0aW9uIHx8IFtdO1xuICAgICAgICAgICAgICAgIG9wdHMubGVuZ3RoICYmIHJlbW92ZUZ1bmN0aW9uKHQsIG9wdHMsIHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==