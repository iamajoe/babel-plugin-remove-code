'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeByArg = exports.remove = undefined;

var _utils = require('../utils.js');

// -----------------------------------------
// Functions

/**
 * Remove functions by argument
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 * @param {object} originalPath
 */
var removeByArg = function removeByArg(t) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var path = arguments[2];

    if (!path || path.removed || path.type !== 'CallExpression') {
        return;
    }

    // It doesn't exist in the options
    var args = path.get('arguments');

    // Now maybe we have something to remove!
    var toRemove = args.length && (0, _utils.getsArrItem)(opts, path, args);
    toRemove = toRemove || [];
    toRemove = toRemove.filter(function (val) {
        return !!val && !val.removed;
    });

    if (toRemove && toRemove.length) {
        for (var i = 0; i < toRemove.length; i += 1) {
            toRemove[i] && !toRemove[i].removed && toRemove[i].remove();
        }
    }
};

/**
 * Remove functions
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 * @param {object} originalPath
 */
var remove = function remove(t) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var path = arguments[2];

    if (!path || path.removed) {
        return;
    }

    // It doesn't exist in the options
    var pathHasIds = path.type === 'CallExpression' ? path.get('callee') : path;
    var ids = (0, _utils.getObjItem)(pathHasIds);
    if (!(0, _utils.matches)(opts, ids.join('.'))) {
        return;
    }

    !path.removed && path.remove();
};

// -----------------------------------------
// Export

exports.remove = remove;
exports.removeByArg = removeByArg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2Z1bmN0aW9uLmpzIl0sIm5hbWVzIjpbInJlbW92ZUJ5QXJnIiwidCIsIm9wdHMiLCJwYXRoIiwicmVtb3ZlZCIsInR5cGUiLCJhcmdzIiwiZ2V0IiwidG9SZW1vdmUiLCJsZW5ndGgiLCJmaWx0ZXIiLCJ2YWwiLCJpIiwicmVtb3ZlIiwicGF0aEhhc0lkcyIsImlkcyIsImpvaW4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFRQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsQ0FBRCxFQUF3QjtBQUFBLFFBQXBCQyxJQUFvQix1RUFBYixFQUFhO0FBQUEsUUFBVEMsSUFBUzs7QUFDeEMsUUFBSSxDQUFDQSxJQUFELElBQVNBLEtBQUtDLE9BQWQsSUFBeUJELEtBQUtFLElBQUwsS0FBYyxnQkFBM0MsRUFBNkQ7QUFBRTtBQUFTOztBQUV4RTtBQUNBLFFBQU1DLE9BQU9ILEtBQUtJLEdBQUwsQ0FBUyxXQUFULENBQWI7O0FBRUE7QUFDQSxRQUFJQyxXQUFXRixLQUFLRyxNQUFMLElBQWUsd0JBQVlQLElBQVosRUFBa0JDLElBQWxCLEVBQXdCRyxJQUF4QixDQUE5QjtBQUNBRSxlQUFXQSxZQUFZLEVBQXZCO0FBQ0FBLGVBQVdBLFNBQVNFLE1BQVQsQ0FBZ0I7QUFBQSxlQUFPLENBQUMsQ0FBQ0MsR0FBRixJQUFTLENBQUNBLElBQUlQLE9BQXJCO0FBQUEsS0FBaEIsQ0FBWDs7QUFFQSxRQUFJSSxZQUFZQSxTQUFTQyxNQUF6QixFQUFpQztBQUM3QixhQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSUosU0FBU0MsTUFBN0IsRUFBcUNHLEtBQUssQ0FBMUMsRUFBNkM7QUFDekNKLHFCQUFTSSxDQUFULEtBQWUsQ0FBQ0osU0FBU0ksQ0FBVCxFQUFZUixPQUE1QixJQUF1Q0ksU0FBU0ksQ0FBVCxFQUFZQyxNQUFaLEVBQXZDO0FBQ0g7QUFDSjtBQUNKLENBaEJEOztBQWtCQTs7Ozs7Ozs7QUFRQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ1osQ0FBRCxFQUF3QjtBQUFBLFFBQXBCQyxJQUFvQix1RUFBYixFQUFhO0FBQUEsUUFBVEMsSUFBUzs7QUFDbkMsUUFBSSxDQUFDQSxJQUFELElBQVNBLEtBQUtDLE9BQWxCLEVBQTJCO0FBQUU7QUFBUzs7QUFFdEM7QUFDQSxRQUFNVSxhQUFjWCxLQUFLRSxJQUFMLEtBQWMsZ0JBQWYsR0FBbUNGLEtBQUtJLEdBQUwsQ0FBUyxRQUFULENBQW5DLEdBQXdESixJQUEzRTtBQUNBLFFBQU1ZLE1BQU0sdUJBQVdELFVBQVgsQ0FBWjtBQUNBLFFBQUksQ0FBQyxvQkFBUVosSUFBUixFQUFjYSxJQUFJQyxJQUFKLENBQVMsR0FBVCxDQUFkLENBQUwsRUFBbUM7QUFBRTtBQUFTOztBQUU5QyxLQUFDYixLQUFLQyxPQUFOLElBQWlCRCxLQUFLVSxNQUFMLEVBQWpCO0FBQ0gsQ0FURDs7QUFXQTtBQUNBOztRQUVTQSxNLEdBQUFBLE07UUFBUWIsVyxHQUFBQSxXIiwiZmlsZSI6ImZ1bmN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBnZXRPYmpJdGVtLCBnZXRzQXJySXRlbSwgbWF0Y2hlcyB9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIFJlbW92ZSBmdW5jdGlvbnMgYnkgYXJndW1lbnRcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdFxuICogQHBhcmFtIHthcnJheX0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcmlnaW5hbFBhdGhcbiAqL1xuY29uc3QgcmVtb3ZlQnlBcmcgPSAodCwgb3B0cyA9IFtdLCBwYXRoKSA9PiB7XG4gICAgaWYgKCFwYXRoIHx8IHBhdGgucmVtb3ZlZCB8fCBwYXRoLnR5cGUgIT09ICdDYWxsRXhwcmVzc2lvbicpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBJdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBvcHRpb25zXG4gICAgY29uc3QgYXJncyA9IHBhdGguZ2V0KCdhcmd1bWVudHMnKTtcblxuICAgIC8vIE5vdyBtYXliZSB3ZSBoYXZlIHNvbWV0aGluZyB0byByZW1vdmUhXG4gICAgbGV0IHRvUmVtb3ZlID0gYXJncy5sZW5ndGggJiYgZ2V0c0Fyckl0ZW0ob3B0cywgcGF0aCwgYXJncyk7XG4gICAgdG9SZW1vdmUgPSB0b1JlbW92ZSB8fCBbXTtcbiAgICB0b1JlbW92ZSA9IHRvUmVtb3ZlLmZpbHRlcih2YWwgPT4gISF2YWwgJiYgIXZhbC5yZW1vdmVkKTtcblxuICAgIGlmICh0b1JlbW92ZSAmJiB0b1JlbW92ZS5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b1JlbW92ZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdG9SZW1vdmVbaV0gJiYgIXRvUmVtb3ZlW2ldLnJlbW92ZWQgJiYgdG9SZW1vdmVbaV0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSBmdW5jdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdFxuICogQHBhcmFtIHthcnJheX0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcmlnaW5hbFBhdGhcbiAqL1xuY29uc3QgcmVtb3ZlID0gKHQsIG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGlmICghcGF0aCB8fCBwYXRoLnJlbW92ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBJdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBvcHRpb25zXG4gICAgY29uc3QgcGF0aEhhc0lkcyA9IChwYXRoLnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbicpID8gcGF0aC5nZXQoJ2NhbGxlZScpIDogcGF0aDtcbiAgICBjb25zdCBpZHMgPSBnZXRPYmpJdGVtKHBhdGhIYXNJZHMpO1xuICAgIGlmICghbWF0Y2hlcyhvcHRzLCBpZHMuam9pbignLicpKSkgeyByZXR1cm47IH1cblxuICAgICFwYXRoLnJlbW92ZWQgJiYgcGF0aC5yZW1vdmUoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IHsgcmVtb3ZlLCByZW1vdmVCeUFyZyB9O1xuIl19