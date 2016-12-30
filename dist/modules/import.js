'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = undefined;

var _utils = require('../utils.js');

var _function = require('./function.js');

var _var = require('./var.js');

// -----------------------------------------
// Functions

/**
 * Removes target references
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 * @returns
 */
var removeTargetRefs = function removeTargetRefs(t) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var path = arguments[2];

    var specifiers = path && path.specifiers || path && path.node && path.node.specifiers || [];

    specifiers.forEach(function (specifier) {
        var importedIdentifierName = specifier.local.name;

        var _path$scope$getBindin = path.scope.getBinding(importedIdentifierName),
            referencePaths = _path$scope$getBindin.referencePaths;

        // Go per reference path


        referencePaths.forEach(function (referencePath) {
            (0, _function.remove)(t, [importedIdentifierName], referencePath.parentPath);
            (0, _function.removeByArg)(t, [importedIdentifierName], referencePath.parentPath);
            (0, _var.remove)(t, [importedIdentifierName], referencePath.parentPath);
        });
    });

    !path.removed && path.remove();
};

/**
 * Remove import
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
var remove = function remove(t) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var path = arguments[2];

    if (!path || path.removed) {
        return;
    }

    var source = path.source || path.node.source;
    if (!source || !source.value) {
        return;
    }

    // It doesn't exist in the options
    if (!(0, _utils.matches)(opts, source.value)) {
        return;
    }
    removeTargetRefs(t, opts, path);

    !path.removed && path.remove();
};

// -----------------------------------------
// Export

exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2ltcG9ydC5qcyJdLCJuYW1lcyI6WyJyZW1vdmVUYXJnZXRSZWZzIiwidCIsIm9wdHMiLCJwYXRoIiwic3BlY2lmaWVycyIsIm5vZGUiLCJmb3JFYWNoIiwic3BlY2lmaWVyIiwiaW1wb3J0ZWRJZGVudGlmaWVyTmFtZSIsImxvY2FsIiwibmFtZSIsInNjb3BlIiwiZ2V0QmluZGluZyIsInJlZmVyZW5jZVBhdGhzIiwicmVmZXJlbmNlUGF0aCIsInBhcmVudFBhdGgiLCJyZW1vdmVkIiwicmVtb3ZlIiwic291cmNlIiwidmFsdWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFRQSxJQUFNQSxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFDQyxDQUFELEVBQXdCO0FBQUEsUUFBcEJDLElBQW9CLHVFQUFiLEVBQWE7QUFBQSxRQUFUQyxJQUFTOztBQUM3QyxRQUFNQyxhQUFhRCxRQUFRQSxLQUFLQyxVQUFiLElBQTJCRCxRQUFRQSxLQUFLRSxJQUFiLElBQXFCRixLQUFLRSxJQUFMLENBQVVELFVBQTFELElBQXdFLEVBQTNGOztBQUVBQSxlQUFXRSxPQUFYLENBQW1CLFVBQUNDLFNBQUQsRUFBZTtBQUM5QixZQUFNQyx5QkFBeUJELFVBQVVFLEtBQVYsQ0FBZ0JDLElBQS9DOztBQUQ4QixvQ0FFSFAsS0FBS1EsS0FBTCxDQUFXQyxVQUFYLENBQXNCSixzQkFBdEIsQ0FGRztBQUFBLFlBRXRCSyxjQUZzQix5QkFFdEJBLGNBRnNCOztBQUk5Qjs7O0FBQ0FBLHVCQUFlUCxPQUFmLENBQXVCLFVBQUNRLGFBQUQsRUFBbUI7QUFDdEMsa0NBQWViLENBQWYsRUFBa0IsQ0FBQ08sc0JBQUQsQ0FBbEIsRUFBNENNLGNBQWNDLFVBQTFEO0FBQ0EsdUNBQW9CZCxDQUFwQixFQUF1QixDQUFDTyxzQkFBRCxDQUF2QixFQUFpRE0sY0FBY0MsVUFBL0Q7QUFDQSw2QkFBVWQsQ0FBVixFQUFhLENBQUNPLHNCQUFELENBQWIsRUFBdUNNLGNBQWNDLFVBQXJEO0FBQ0gsU0FKRDtBQUtILEtBVkQ7O0FBWUEsS0FBQ1osS0FBS2EsT0FBTixJQUFpQmIsS0FBS2MsTUFBTCxFQUFqQjtBQUNILENBaEJEOztBQWtCQTs7Ozs7OztBQU9BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFDaEIsQ0FBRCxFQUF3QjtBQUFBLFFBQXBCQyxJQUFvQix1RUFBYixFQUFhO0FBQUEsUUFBVEMsSUFBUzs7QUFDbkMsUUFBSSxDQUFDQSxJQUFELElBQVNBLEtBQUthLE9BQWxCLEVBQTJCO0FBQUU7QUFBUzs7QUFFdEMsUUFBTUUsU0FBU2YsS0FBS2UsTUFBTCxJQUFlZixLQUFLRSxJQUFMLENBQVVhLE1BQXhDO0FBQ0EsUUFBSSxDQUFDQSxNQUFELElBQVcsQ0FBQ0EsT0FBT0MsS0FBdkIsRUFBOEI7QUFBRTtBQUFTOztBQUV6QztBQUNBLFFBQUksQ0FBQyxvQkFBUWpCLElBQVIsRUFBY2dCLE9BQU9DLEtBQXJCLENBQUwsRUFBa0M7QUFBRTtBQUFTO0FBQzdDbkIscUJBQWlCQyxDQUFqQixFQUFvQkMsSUFBcEIsRUFBMEJDLElBQTFCOztBQUVBLEtBQUNBLEtBQUthLE9BQU4sSUFBaUJiLEtBQUtjLE1BQUwsRUFBakI7QUFDSCxDQVhEOztBQWFBO0FBQ0E7O1FBRVNBLE0sR0FBQUEsTSIsImZpbGUiOiJpbXBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IG1hdGNoZXMgfSBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgeyByZW1vdmUgYXMgcmVtb3ZlRnVuY3Rpb24sIHJlbW92ZUJ5QXJnIGFzIHJlbW92ZUZ1bmN0aW9uQnlBcmcgfSBmcm9tICcuL2Z1bmN0aW9uLmpzJztcbmltcG9ydCB7IHJlbW92ZSBhcyByZW1vdmVWYXIgfSBmcm9tICcuL3Zhci5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcblxuLyoqXG4gKiBSZW1vdmVzIHRhcmdldCByZWZlcmVuY2VzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCByZW1vdmVUYXJnZXRSZWZzID0gKHQsIG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGNvbnN0IHNwZWNpZmllcnMgPSBwYXRoICYmIHBhdGguc3BlY2lmaWVycyB8fCBwYXRoICYmIHBhdGgubm9kZSAmJiBwYXRoLm5vZGUuc3BlY2lmaWVycyB8fCBbXTtcblxuICAgIHNwZWNpZmllcnMuZm9yRWFjaCgoc3BlY2lmaWVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGltcG9ydGVkSWRlbnRpZmllck5hbWUgPSBzcGVjaWZpZXIubG9jYWwubmFtZTtcbiAgICAgICAgY29uc3QgeyByZWZlcmVuY2VQYXRocyB9ID0gcGF0aC5zY29wZS5nZXRCaW5kaW5nKGltcG9ydGVkSWRlbnRpZmllck5hbWUpO1xuXG4gICAgICAgIC8vIEdvIHBlciByZWZlcmVuY2UgcGF0aFxuICAgICAgICByZWZlcmVuY2VQYXRocy5mb3JFYWNoKChyZWZlcmVuY2VQYXRoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVGdW5jdGlvbih0LCBbaW1wb3J0ZWRJZGVudGlmaWVyTmFtZV0sIHJlZmVyZW5jZVBhdGgucGFyZW50UGF0aCk7XG4gICAgICAgICAgICByZW1vdmVGdW5jdGlvbkJ5QXJnKHQsIFtpbXBvcnRlZElkZW50aWZpZXJOYW1lXSwgcmVmZXJlbmNlUGF0aC5wYXJlbnRQYXRoKTtcbiAgICAgICAgICAgIHJlbW92ZVZhcih0LCBbaW1wb3J0ZWRJZGVudGlmaWVyTmFtZV0sIHJlZmVyZW5jZVBhdGgucGFyZW50UGF0aCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgIXBhdGgucmVtb3ZlZCAmJiBwYXRoLnJlbW92ZSgpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgaW1wb3J0XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKi9cbmNvbnN0IHJlbW92ZSA9ICh0LCBvcHRzID0gW10sIHBhdGgpID0+IHtcbiAgICBpZiAoIXBhdGggfHwgcGF0aC5yZW1vdmVkKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3Qgc291cmNlID0gcGF0aC5zb3VyY2UgfHwgcGF0aC5ub2RlLnNvdXJjZTtcbiAgICBpZiAoIXNvdXJjZSB8fCAhc291cmNlLnZhbHVlKSB7IHJldHVybjsgfVxuXG4gICAgLy8gSXQgZG9lc24ndCBleGlzdCBpbiB0aGUgb3B0aW9uc1xuICAgIGlmICghbWF0Y2hlcyhvcHRzLCBzb3VyY2UudmFsdWUpKSB7IHJldHVybjsgfVxuICAgIHJlbW92ZVRhcmdldFJlZnModCwgb3B0cywgcGF0aCk7XG5cbiAgICAhcGF0aC5yZW1vdmVkICYmIHBhdGgucmVtb3ZlKCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0XG5cbmV4cG9ydCB7IHJlbW92ZSB9O1xuIl19