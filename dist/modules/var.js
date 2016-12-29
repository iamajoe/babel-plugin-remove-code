'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = undefined;

var _utils = require('../utils.js');

// -----------------------------------------
// Functions

/**
 * Is it either of the sides?
 *
 * @param {object} opts
 * @param {object} path
 * @param {string} leftKey
 * @param {string} rightKey
 * @returns {object}
 */
var isEitherSide = function isEitherSide(opts, path) {
    var leftKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';
    var rightKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'right';

    var left = path.get(leftKey);
    var right = path.get(rightKey);
    var idsLeft = (0, _utils.getObjItem)(left);
    var idsRight = (0, _utils.getObjItem)(right);

    return {
        isLeft: opts.indexOf(idsLeft.join('.')) !== -1,
        isRight: opts.indexOf(idsRight.join('.')) !== -1,
        left: left, right: right
    };
};

/**
 * Remove var
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
var remove = function remove(t) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var path = arguments[2];

    if (!path) {
        return;
    }

    var toRemove = void 0;

    if (path.type === 'VariableDeclarator') {
        var isIt = isEitherSide(opts, path, 'id', 'init');
        if (!isIt.isLeft && !isIt.isRight) {
            return;
        }

        toRemove = path;
    } else if (path.type === 'AssignmentExpression') {
        var _isIt = isEitherSide(opts, path);
        if (!_isIt.isLeft && !_isIt.isRight) {
            return;
        }

        toRemove = path;
    } else if (path.type === 'BinaryExpression') {
        var _isIt2 = isEitherSide(opts, path);
        if (!_isIt2.isLeft && !_isIt2.isRight) {
            return;
        }

        toRemove = path;
    } else if (path.type === 'LogicalExpression') {
        var _isIt3 = isEitherSide(opts, path);
        if (!_isIt3.isLeft && !_isIt3.isRight) {
            return;
        }

        toRemove = _isIt3.isLeft && _isIt3.left || _isIt3.isRight && _isIt3.right || undefined;
    }

    // We need to check if it is a IfStatement
    var parent = toRemove && toRemove.parentPath;
    if (parent && parent.type === 'IfStatement') {
        toRemove = parent;
    }

    toRemove && !toRemove.removed && toRemove.remove();
};

// -----------------------------------------
// Export

exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3Zhci5qcyJdLCJuYW1lcyI6WyJpc0VpdGhlclNpZGUiLCJvcHRzIiwicGF0aCIsImxlZnRLZXkiLCJyaWdodEtleSIsImxlZnQiLCJnZXQiLCJyaWdodCIsImlkc0xlZnQiLCJpZHNSaWdodCIsImlzTGVmdCIsImluZGV4T2YiLCJqb2luIiwiaXNSaWdodCIsInJlbW92ZSIsInQiLCJ0b1JlbW92ZSIsInR5cGUiLCJpc0l0IiwidW5kZWZpbmVkIiwicGFyZW50IiwicGFyZW50UGF0aCIsInJlbW92ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FBU0EsSUFBTUEsZUFBZSxTQUFmQSxZQUFlLENBQUNDLElBQUQsRUFBT0MsSUFBUCxFQUFzRDtBQUFBLFFBQXpDQyxPQUF5Qyx1RUFBL0IsTUFBK0I7QUFBQSxRQUF2QkMsUUFBdUIsdUVBQVosT0FBWTs7QUFDdkUsUUFBTUMsT0FBT0gsS0FBS0ksR0FBTCxDQUFTSCxPQUFULENBQWI7QUFDQSxRQUFNSSxRQUFRTCxLQUFLSSxHQUFMLENBQVNGLFFBQVQsQ0FBZDtBQUNBLFFBQU1JLFVBQVUsdUJBQVdILElBQVgsQ0FBaEI7QUFDQSxRQUFNSSxXQUFXLHVCQUFXRixLQUFYLENBQWpCOztBQUVBLFdBQU87QUFDSEcsZ0JBQVFULEtBQUtVLE9BQUwsQ0FBYUgsUUFBUUksSUFBUixDQUFhLEdBQWIsQ0FBYixNQUFvQyxDQUFDLENBRDFDO0FBRUhDLGlCQUFTWixLQUFLVSxPQUFMLENBQWFGLFNBQVNHLElBQVQsQ0FBYyxHQUFkLENBQWIsTUFBcUMsQ0FBQyxDQUY1QztBQUdIUCxrQkFIRyxFQUdHRTtBQUhILEtBQVA7QUFLSCxDQVhEOztBQWFBOzs7Ozs7O0FBT0EsSUFBTU8sU0FBUyxTQUFUQSxNQUFTLENBQUNDLENBQUQsRUFBd0I7QUFBQSxRQUFwQmQsSUFBb0IsdUVBQWIsRUFBYTtBQUFBLFFBQVRDLElBQVM7O0FBQ25DLFFBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQUU7QUFBUzs7QUFFdEIsUUFBSWMsaUJBQUo7O0FBRUEsUUFBSWQsS0FBS2UsSUFBTCxLQUFjLG9CQUFsQixFQUF3QztBQUNwQyxZQUFNQyxPQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsTUFBL0IsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLEtBQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsS0FBS0wsT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0csbUJBQVdkLElBQVg7QUFDSCxLQUxELE1BS08sSUFBSUEsS0FBS2UsSUFBTCxLQUFjLHNCQUFsQixFQUEwQztBQUM3QyxZQUFNQyxRQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLE1BQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsTUFBS0wsT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0csbUJBQVdkLElBQVg7QUFDSCxLQUxNLE1BS0EsSUFBSUEsS0FBS2UsSUFBTCxLQUFjLGtCQUFsQixFQUFzQztBQUN6QyxZQUFNQyxTQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLE9BQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsT0FBS0wsT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0csbUJBQVdkLElBQVg7QUFDSCxLQUxNLE1BS0EsSUFBSUEsS0FBS2UsSUFBTCxLQUFjLG1CQUFsQixFQUF1QztBQUMxQyxZQUFNQyxTQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLE9BQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsT0FBS0wsT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0csbUJBQVdFLE9BQUtSLE1BQUwsSUFBZVEsT0FBS2IsSUFBcEIsSUFBNEJhLE9BQUtMLE9BQUwsSUFBZ0JLLE9BQUtYLEtBQWpELElBQTBEWSxTQUFyRTtBQUNIOztBQUVEO0FBQ0EsUUFBTUMsU0FBU0osWUFBWUEsU0FBU0ssVUFBcEM7QUFDQSxRQUFJRCxVQUFVQSxPQUFPSCxJQUFQLEtBQWdCLGFBQTlCLEVBQTZDO0FBQ3pDRCxtQkFBV0ksTUFBWDtBQUNIOztBQUVESixnQkFBWSxDQUFDQSxTQUFTTSxPQUF0QixJQUFpQ04sU0FBU0YsTUFBVCxFQUFqQztBQUNILENBbENEOztBQW9DQTtBQUNBOztRQUVTQSxNLEdBQUFBLE0iLCJmaWxlIjoidmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBnZXRPYmpJdGVtIH0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogSXMgaXQgZWl0aGVyIG9mIHRoZSBzaWRlcz9cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZWZ0S2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gcmlnaHRLZXlcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cbmNvbnN0IGlzRWl0aGVyU2lkZSA9IChvcHRzLCBwYXRoLCBsZWZ0S2V5ID0gJ2xlZnQnLCByaWdodEtleSA9ICdyaWdodCcpID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gcGF0aC5nZXQobGVmdEtleSk7XG4gICAgY29uc3QgcmlnaHQgPSBwYXRoLmdldChyaWdodEtleSk7XG4gICAgY29uc3QgaWRzTGVmdCA9IGdldE9iakl0ZW0obGVmdCk7XG4gICAgY29uc3QgaWRzUmlnaHQgPSBnZXRPYmpJdGVtKHJpZ2h0KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGlzTGVmdDogb3B0cy5pbmRleE9mKGlkc0xlZnQuam9pbignLicpKSAhPT0gLTEsXG4gICAgICAgIGlzUmlnaHQ6IG9wdHMuaW5kZXhPZihpZHNSaWdodC5qb2luKCcuJykpICE9PSAtMSxcbiAgICAgICAgbGVmdCwgcmlnaHRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdmFyXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKi9cbmNvbnN0IHJlbW92ZSA9ICh0LCBvcHRzID0gW10sIHBhdGgpID0+IHtcbiAgICBpZiAoIXBhdGgpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgdG9SZW1vdmU7XG5cbiAgICBpZiAocGF0aC50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdG9yJykge1xuICAgICAgICBjb25zdCBpc0l0ID0gaXNFaXRoZXJTaWRlKG9wdHMsIHBhdGgsICdpZCcsICdpbml0Jyk7XG4gICAgICAgIGlmICghaXNJdC5pc0xlZnQgJiYgIWlzSXQuaXNSaWdodCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b1JlbW92ZSA9IHBhdGg7XG4gICAgfSBlbHNlIGlmIChwYXRoLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgY29uc3QgaXNJdCA9IGlzRWl0aGVyU2lkZShvcHRzLCBwYXRoKTtcbiAgICAgICAgaWYgKCFpc0l0LmlzTGVmdCAmJiAhaXNJdC5pc1JpZ2h0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRvUmVtb3ZlID0gcGF0aDtcbiAgICB9IGVsc2UgaWYgKHBhdGgudHlwZSA9PT0gJ0JpbmFyeUV4cHJlc3Npb24nKSB7XG4gICAgICAgIGNvbnN0IGlzSXQgPSBpc0VpdGhlclNpZGUob3B0cywgcGF0aCk7XG4gICAgICAgIGlmICghaXNJdC5pc0xlZnQgJiYgIWlzSXQuaXNSaWdodCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b1JlbW92ZSA9IHBhdGg7XG4gICAgfSBlbHNlIGlmIChwYXRoLnR5cGUgPT09ICdMb2dpY2FsRXhwcmVzc2lvbicpIHtcbiAgICAgICAgY29uc3QgaXNJdCA9IGlzRWl0aGVyU2lkZShvcHRzLCBwYXRoKTtcbiAgICAgICAgaWYgKCFpc0l0LmlzTGVmdCAmJiAhaXNJdC5pc1JpZ2h0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRvUmVtb3ZlID0gaXNJdC5pc0xlZnQgJiYgaXNJdC5sZWZ0IHx8IGlzSXQuaXNSaWdodCAmJiBpc0l0LnJpZ2h0IHx8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGlmIGl0IGlzIGEgSWZTdGF0ZW1lbnRcbiAgICBjb25zdCBwYXJlbnQgPSB0b1JlbW92ZSAmJiB0b1JlbW92ZS5wYXJlbnRQYXRoO1xuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnR5cGUgPT09ICdJZlN0YXRlbWVudCcpIHtcbiAgICAgICAgdG9SZW1vdmUgPSBwYXJlbnQ7XG4gICAgfVxuXG4gICAgdG9SZW1vdmUgJiYgIXRvUmVtb3ZlLnJlbW92ZWQgJiYgdG9SZW1vdmUucmVtb3ZlKCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0XG5cbmV4cG9ydCB7IHJlbW92ZSB9O1xuIl19