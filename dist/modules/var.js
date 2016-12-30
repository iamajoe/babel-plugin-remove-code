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
        isLeft: (0, _utils.matches)(opts, idsLeft.join('.')),
        isRight: (0, _utils.matches)(opts, idsRight.join('.')),
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

    if (!path || path.removed) {
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
        // We should ignore it for now... It will be checked later
        if (path.get('right').type === 'LogicalExpression') {
            return;
        }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3Zhci5qcyJdLCJuYW1lcyI6WyJpc0VpdGhlclNpZGUiLCJvcHRzIiwicGF0aCIsImxlZnRLZXkiLCJyaWdodEtleSIsImxlZnQiLCJnZXQiLCJyaWdodCIsImlkc0xlZnQiLCJpZHNSaWdodCIsImlzTGVmdCIsImpvaW4iLCJpc1JpZ2h0IiwicmVtb3ZlIiwidCIsInJlbW92ZWQiLCJ0b1JlbW92ZSIsInR5cGUiLCJpc0l0IiwidW5kZWZpbmVkIiwicGFyZW50IiwicGFyZW50UGF0aCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUFTQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQXNEO0FBQUEsUUFBekNDLE9BQXlDLHVFQUEvQixNQUErQjtBQUFBLFFBQXZCQyxRQUF1Qix1RUFBWixPQUFZOztBQUN2RSxRQUFNQyxPQUFPSCxLQUFLSSxHQUFMLENBQVNILE9BQVQsQ0FBYjtBQUNBLFFBQU1JLFFBQVFMLEtBQUtJLEdBQUwsQ0FBU0YsUUFBVCxDQUFkO0FBQ0EsUUFBTUksVUFBVSx1QkFBV0gsSUFBWCxDQUFoQjtBQUNBLFFBQU1JLFdBQVcsdUJBQVdGLEtBQVgsQ0FBakI7O0FBRUEsV0FBTztBQUNIRyxnQkFBUSxvQkFBUVQsSUFBUixFQUFjTyxRQUFRRyxJQUFSLENBQWEsR0FBYixDQUFkLENBREw7QUFFSEMsaUJBQVMsb0JBQVFYLElBQVIsRUFBY1EsU0FBU0UsSUFBVCxDQUFjLEdBQWQsQ0FBZCxDQUZOO0FBR0hOLGtCQUhHLEVBR0dFO0FBSEgsS0FBUDtBQUtILENBWEQ7O0FBYUE7Ozs7Ozs7QUFPQSxJQUFNTSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsQ0FBRCxFQUF3QjtBQUFBLFFBQXBCYixJQUFvQix1RUFBYixFQUFhO0FBQUEsUUFBVEMsSUFBUzs7QUFDbkMsUUFBSSxDQUFDQSxJQUFELElBQVNBLEtBQUthLE9BQWxCLEVBQTJCO0FBQUU7QUFBUzs7QUFFdEMsUUFBSUMsaUJBQUo7O0FBRUEsUUFBSWQsS0FBS2UsSUFBTCxLQUFjLG9CQUFsQixFQUF3QztBQUNwQyxZQUFNQyxPQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsTUFBL0IsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLEtBQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsS0FBS04sT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0ksbUJBQVdkLElBQVg7QUFDSCxLQUxELE1BS08sSUFBSUEsS0FBS2UsSUFBTCxLQUFjLHNCQUFsQixFQUEwQztBQUM3QztBQUNBLFlBQUlmLEtBQUtJLEdBQUwsQ0FBUyxPQUFULEVBQWtCVyxJQUFsQixLQUEyQixtQkFBL0IsRUFBb0Q7QUFDaEQ7QUFDSDs7QUFFRCxZQUFNQyxRQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLE1BQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsTUFBS04sT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0ksbUJBQVdkLElBQVg7QUFDSCxLQVZNLE1BVUEsSUFBSUEsS0FBS2UsSUFBTCxLQUFjLGtCQUFsQixFQUFzQztBQUN6QyxZQUFNQyxTQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLE9BQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsT0FBS04sT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0ksbUJBQVdkLElBQVg7QUFDSCxLQUxNLE1BS0EsSUFBSUEsS0FBS2UsSUFBTCxLQUFjLG1CQUFsQixFQUF1QztBQUMxQyxZQUFNQyxTQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLE9BQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsT0FBS04sT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0ksbUJBQVdFLE9BQUtSLE1BQUwsSUFBZVEsT0FBS2IsSUFBcEIsSUFBNEJhLE9BQUtOLE9BQUwsSUFBZ0JNLE9BQUtYLEtBQWpELElBQTBEWSxTQUFyRTtBQUNIOztBQUVEO0FBQ0EsUUFBTUMsU0FBU0osWUFBWUEsU0FBU0ssVUFBcEM7QUFDQSxRQUFJRCxVQUFVQSxPQUFPSCxJQUFQLEtBQWdCLGFBQTlCLEVBQTZDO0FBQ3pDRCxtQkFBV0ksTUFBWDtBQUNIOztBQUVESixnQkFBWSxDQUFDQSxTQUFTRCxPQUF0QixJQUFpQ0MsU0FBU0gsTUFBVCxFQUFqQztBQUNILENBdkNEOztBQXlDQTtBQUNBOztRQUVTQSxNLEdBQUFBLE0iLCJmaWxlIjoidmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBnZXRPYmpJdGVtLCBtYXRjaGVzIH0gZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogSXMgaXQgZWl0aGVyIG9mIHRoZSBzaWRlcz9cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZWZ0S2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gcmlnaHRLZXlcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cbmNvbnN0IGlzRWl0aGVyU2lkZSA9IChvcHRzLCBwYXRoLCBsZWZ0S2V5ID0gJ2xlZnQnLCByaWdodEtleSA9ICdyaWdodCcpID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gcGF0aC5nZXQobGVmdEtleSk7XG4gICAgY29uc3QgcmlnaHQgPSBwYXRoLmdldChyaWdodEtleSk7XG4gICAgY29uc3QgaWRzTGVmdCA9IGdldE9iakl0ZW0obGVmdCk7XG4gICAgY29uc3QgaWRzUmlnaHQgPSBnZXRPYmpJdGVtKHJpZ2h0KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGlzTGVmdDogbWF0Y2hlcyhvcHRzLCBpZHNMZWZ0LmpvaW4oJy4nKSksXG4gICAgICAgIGlzUmlnaHQ6IG1hdGNoZXMob3B0cywgaWRzUmlnaHQuam9pbignLicpKSxcbiAgICAgICAgbGVmdCwgcmlnaHRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdmFyXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKi9cbmNvbnN0IHJlbW92ZSA9ICh0LCBvcHRzID0gW10sIHBhdGgpID0+IHtcbiAgICBpZiAoIXBhdGggfHwgcGF0aC5yZW1vdmVkKSB7IHJldHVybjsgfVxuXG4gICAgbGV0IHRvUmVtb3ZlO1xuXG4gICAgaWYgKHBhdGgudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRvcicpIHtcbiAgICAgICAgY29uc3QgaXNJdCA9IGlzRWl0aGVyU2lkZShvcHRzLCBwYXRoLCAnaWQnLCAnaW5pdCcpO1xuICAgICAgICBpZiAoIWlzSXQuaXNMZWZ0ICYmICFpc0l0LmlzUmlnaHQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdG9SZW1vdmUgPSBwYXRoO1xuICAgIH0gZWxzZSBpZiAocGF0aC50eXBlID09PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSB7XG4gICAgICAgIC8vIFdlIHNob3VsZCBpZ25vcmUgaXQgZm9yIG5vdy4uLiBJdCB3aWxsIGJlIGNoZWNrZWQgbGF0ZXJcbiAgICAgICAgaWYgKHBhdGguZ2V0KCdyaWdodCcpLnR5cGUgPT09ICdMb2dpY2FsRXhwcmVzc2lvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzSXQgPSBpc0VpdGhlclNpZGUob3B0cywgcGF0aCk7XG4gICAgICAgIGlmICghaXNJdC5pc0xlZnQgJiYgIWlzSXQuaXNSaWdodCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b1JlbW92ZSA9IHBhdGg7XG4gICAgfSBlbHNlIGlmIChwYXRoLnR5cGUgPT09ICdCaW5hcnlFeHByZXNzaW9uJykge1xuICAgICAgICBjb25zdCBpc0l0ID0gaXNFaXRoZXJTaWRlKG9wdHMsIHBhdGgpO1xuICAgICAgICBpZiAoIWlzSXQuaXNMZWZ0ICYmICFpc0l0LmlzUmlnaHQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdG9SZW1vdmUgPSBwYXRoO1xuICAgIH0gZWxzZSBpZiAocGF0aC50eXBlID09PSAnTG9naWNhbEV4cHJlc3Npb24nKSB7XG4gICAgICAgIGNvbnN0IGlzSXQgPSBpc0VpdGhlclNpZGUob3B0cywgcGF0aCk7XG4gICAgICAgIGlmICghaXNJdC5pc0xlZnQgJiYgIWlzSXQuaXNSaWdodCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b1JlbW92ZSA9IGlzSXQuaXNMZWZ0ICYmIGlzSXQubGVmdCB8fCBpc0l0LmlzUmlnaHQgJiYgaXNJdC5yaWdodCB8fCB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBpdCBpcyBhIElmU3RhdGVtZW50XG4gICAgY29uc3QgcGFyZW50ID0gdG9SZW1vdmUgJiYgdG9SZW1vdmUucGFyZW50UGF0aDtcbiAgICBpZiAocGFyZW50ICYmIHBhcmVudC50eXBlID09PSAnSWZTdGF0ZW1lbnQnKSB7XG4gICAgICAgIHRvUmVtb3ZlID0gcGFyZW50O1xuICAgIH1cblxuICAgIHRvUmVtb3ZlICYmICF0b1JlbW92ZS5yZW1vdmVkICYmIHRvUmVtb3ZlLnJlbW92ZSgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydFxuXG5leHBvcnQgeyByZW1vdmUgfTtcbiJdfQ==