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

  if (!path || path.type !== 'CallExpression') {
    return;
  }

  // It doesn't exist in the options
  var args = path.get('arguments');

  // Now maybe we have something to remove!
  var toRemove = args.length && (0, _utils.getsArrItem)(opts, path, args);

  toRemove && !toRemove.removed && toRemove.remove();
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

  if (!path) {
    return;
  }

  // It doesn't exist in the options
  var pathHasIds = path.type === 'CallExpression' ? path.get('callee') : path;
  var ids = (0, _utils.getObjItem)(pathHasIds);
  if (opts.indexOf(ids.join('.')) === -1) {
    return;
  }

  !path.removed && path.remove();
};

// -----------------------------------------
// Export

exports.remove = remove;
exports.removeByArg = removeByArg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2Z1bmN0aW9uLmpzIl0sIm5hbWVzIjpbInJlbW92ZUJ5QXJnIiwidCIsIm9wdHMiLCJwYXRoIiwidHlwZSIsImFyZ3MiLCJnZXQiLCJ0b1JlbW92ZSIsImxlbmd0aCIsInJlbW92ZWQiLCJyZW1vdmUiLCJwYXRoSGFzSWRzIiwiaWRzIiwiaW5kZXhPZiIsImpvaW4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFRQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsQ0FBRCxFQUF3QjtBQUFBLE1BQXBCQyxJQUFvQix1RUFBYixFQUFhO0FBQUEsTUFBVEMsSUFBUzs7QUFDeEMsTUFBSSxDQUFDQSxJQUFELElBQVNBLEtBQUtDLElBQUwsS0FBYyxnQkFBM0IsRUFBNkM7QUFBRTtBQUFTOztBQUV4RDtBQUNBLE1BQU1DLE9BQU9GLEtBQUtHLEdBQUwsQ0FBUyxXQUFULENBQWI7O0FBRUE7QUFDQSxNQUFNQyxXQUFXRixLQUFLRyxNQUFMLElBQWUsd0JBQVlOLElBQVosRUFBa0JDLElBQWxCLEVBQXdCRSxJQUF4QixDQUFoQzs7QUFFQUUsY0FBWSxDQUFDQSxTQUFTRSxPQUF0QixJQUFpQ0YsU0FBU0csTUFBVCxFQUFqQztBQUNILENBVkQ7O0FBWUE7Ozs7Ozs7O0FBUUEsSUFBTUEsU0FBUyxTQUFUQSxNQUFTLENBQUNULENBQUQsRUFBd0I7QUFBQSxNQUFwQkMsSUFBb0IsdUVBQWIsRUFBYTtBQUFBLE1BQVRDLElBQVM7O0FBQ25DLE1BQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQUU7QUFBUzs7QUFFdEI7QUFDQSxNQUFNUSxhQUFjUixLQUFLQyxJQUFMLEtBQWMsZ0JBQWYsR0FBbUNELEtBQUtHLEdBQUwsQ0FBUyxRQUFULENBQW5DLEdBQXdESCxJQUEzRTtBQUNBLE1BQU1TLE1BQU0sdUJBQVdELFVBQVgsQ0FBWjtBQUNBLE1BQUlULEtBQUtXLE9BQUwsQ0FBYUQsSUFBSUUsSUFBSixDQUFTLEdBQVQsQ0FBYixNQUFnQyxDQUFDLENBQXJDLEVBQXdDO0FBQUU7QUFBUzs7QUFFbkQsR0FBQ1gsS0FBS00sT0FBTixJQUFpQk4sS0FBS08sTUFBTCxFQUFqQjtBQUNILENBVEQ7O0FBV0E7QUFDQTs7UUFFU0EsTSxHQUFBQSxNO1FBQVFWLFcsR0FBQUEsVyIsImZpbGUiOiJmdW5jdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgZ2V0T2JqSXRlbSwgZ2V0c0Fyckl0ZW0gfSBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcblxuLyoqXG4gKiBSZW1vdmUgZnVuY3Rpb25zIGJ5IGFyZ3VtZW50XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcGFyYW0ge29iamVjdH0gb3JpZ2luYWxQYXRoXG4gKi9cbmNvbnN0IHJlbW92ZUJ5QXJnID0gKHQsIG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGlmICghcGF0aCB8fCBwYXRoLnR5cGUgIT09ICdDYWxsRXhwcmVzc2lvbicpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBJdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBvcHRpb25zXG4gICAgY29uc3QgYXJncyA9IHBhdGguZ2V0KCdhcmd1bWVudHMnKTtcblxuICAgIC8vIE5vdyBtYXliZSB3ZSBoYXZlIHNvbWV0aGluZyB0byByZW1vdmUhXG4gICAgY29uc3QgdG9SZW1vdmUgPSBhcmdzLmxlbmd0aCAmJiBnZXRzQXJySXRlbShvcHRzLCBwYXRoLCBhcmdzKTtcblxuICAgIHRvUmVtb3ZlICYmICF0b1JlbW92ZS5yZW1vdmVkICYmIHRvUmVtb3ZlLnJlbW92ZSgpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgZnVuY3Rpb25zXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcGFyYW0ge29iamVjdH0gb3JpZ2luYWxQYXRoXG4gKi9cbmNvbnN0IHJlbW92ZSA9ICh0LCBvcHRzID0gW10sIHBhdGgpID0+IHtcbiAgICBpZiAoIXBhdGgpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBJdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBvcHRpb25zXG4gICAgY29uc3QgcGF0aEhhc0lkcyA9IChwYXRoLnR5cGUgPT09ICdDYWxsRXhwcmVzc2lvbicpID8gcGF0aC5nZXQoJ2NhbGxlZScpIDogcGF0aDtcbiAgICBjb25zdCBpZHMgPSBnZXRPYmpJdGVtKHBhdGhIYXNJZHMpO1xuICAgIGlmIChvcHRzLmluZGV4T2YoaWRzLmpvaW4oJy4nKSkgPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgIXBhdGgucmVtb3ZlZCAmJiBwYXRoLnJlbW92ZSgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydFxuXG5leHBvcnQgeyByZW1vdmUsIHJlbW92ZUJ5QXJnIH07XG4iXX0=