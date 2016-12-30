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

        // To fix a bug with classes
        var _parent = toRemove && toRemove.parentPath;
        if (_parent && _parent.type === 'ConditionalExpression') {
            toRemove = _parent;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3Zhci5qcyJdLCJuYW1lcyI6WyJpc0VpdGhlclNpZGUiLCJvcHRzIiwicGF0aCIsImxlZnRLZXkiLCJyaWdodEtleSIsImxlZnQiLCJnZXQiLCJyaWdodCIsImlkc0xlZnQiLCJpZHNSaWdodCIsImlzTGVmdCIsImpvaW4iLCJpc1JpZ2h0IiwicmVtb3ZlIiwidCIsInJlbW92ZWQiLCJ0b1JlbW92ZSIsInR5cGUiLCJpc0l0IiwicGFyZW50IiwicGFyZW50UGF0aCIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUFTQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQXNEO0FBQUEsUUFBekNDLE9BQXlDLHVFQUEvQixNQUErQjtBQUFBLFFBQXZCQyxRQUF1Qix1RUFBWixPQUFZOztBQUN2RSxRQUFNQyxPQUFPSCxLQUFLSSxHQUFMLENBQVNILE9BQVQsQ0FBYjtBQUNBLFFBQU1JLFFBQVFMLEtBQUtJLEdBQUwsQ0FBU0YsUUFBVCxDQUFkO0FBQ0EsUUFBTUksVUFBVSx1QkFBV0gsSUFBWCxDQUFoQjtBQUNBLFFBQU1JLFdBQVcsdUJBQVdGLEtBQVgsQ0FBakI7O0FBRUEsV0FBTztBQUNIRyxnQkFBUSxvQkFBUVQsSUFBUixFQUFjTyxRQUFRRyxJQUFSLENBQWEsR0FBYixDQUFkLENBREw7QUFFSEMsaUJBQVMsb0JBQVFYLElBQVIsRUFBY1EsU0FBU0UsSUFBVCxDQUFjLEdBQWQsQ0FBZCxDQUZOO0FBR0hOLGtCQUhHLEVBR0dFO0FBSEgsS0FBUDtBQUtILENBWEQ7O0FBYUE7Ozs7Ozs7QUFPQSxJQUFNTSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsQ0FBRCxFQUF3QjtBQUFBLFFBQXBCYixJQUFvQix1RUFBYixFQUFhO0FBQUEsUUFBVEMsSUFBUzs7QUFDbkMsUUFBSSxDQUFDQSxJQUFELElBQVNBLEtBQUthLE9BQWxCLEVBQTJCO0FBQUU7QUFBUzs7QUFFdEMsUUFBSUMsaUJBQUo7O0FBRUEsUUFBSWQsS0FBS2UsSUFBTCxLQUFjLG9CQUFsQixFQUF3QztBQUNwQyxZQUFNQyxPQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsTUFBL0IsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLEtBQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsS0FBS04sT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0ksbUJBQVdkLElBQVg7QUFDSCxLQUxELE1BS08sSUFBSUEsS0FBS2UsSUFBTCxLQUFjLHNCQUFsQixFQUEwQztBQUM3QztBQUNBLFlBQUlmLEtBQUtJLEdBQUwsQ0FBUyxPQUFULEVBQWtCVyxJQUFsQixLQUEyQixtQkFBL0IsRUFBb0Q7QUFDaEQ7QUFDSDs7QUFFRCxZQUFNQyxRQUFPbEIsYUFBYUMsSUFBYixFQUFtQkMsSUFBbkIsQ0FBYjtBQUNBLFlBQUksQ0FBQ2dCLE1BQUtSLE1BQU4sSUFBZ0IsQ0FBQ1EsTUFBS04sT0FBMUIsRUFBbUM7QUFBRTtBQUFTOztBQUU5Q0ksbUJBQVdkLElBQVg7O0FBRUE7QUFDQSxZQUFNaUIsVUFBU0gsWUFBWUEsU0FBU0ksVUFBcEM7QUFDQSxZQUFJRCxXQUFVQSxRQUFPRixJQUFQLEtBQWdCLHVCQUE5QixFQUF1RDtBQUNuREQsdUJBQVdHLE9BQVg7QUFDSDtBQUNKLEtBaEJNLE1BZ0JBLElBQUlqQixLQUFLZSxJQUFMLEtBQWMsa0JBQWxCLEVBQXNDO0FBQ3pDLFlBQU1DLFNBQU9sQixhQUFhQyxJQUFiLEVBQW1CQyxJQUFuQixDQUFiO0FBQ0EsWUFBSSxDQUFDZ0IsT0FBS1IsTUFBTixJQUFnQixDQUFDUSxPQUFLTixPQUExQixFQUFtQztBQUFFO0FBQVM7O0FBRTlDSSxtQkFBV2QsSUFBWDtBQUNILEtBTE0sTUFLQSxJQUFJQSxLQUFLZSxJQUFMLEtBQWMsbUJBQWxCLEVBQXVDO0FBQzFDLFlBQU1DLFNBQU9sQixhQUFhQyxJQUFiLEVBQW1CQyxJQUFuQixDQUFiO0FBQ0EsWUFBSSxDQUFDZ0IsT0FBS1IsTUFBTixJQUFnQixDQUFDUSxPQUFLTixPQUExQixFQUFtQztBQUFFO0FBQVM7O0FBRTlDSSxtQkFBV0UsT0FBS1IsTUFBTCxJQUFlUSxPQUFLYixJQUFwQixJQUE0QmEsT0FBS04sT0FBTCxJQUFnQk0sT0FBS1gsS0FBakQsSUFBMERjLFNBQXJFO0FBQ0g7O0FBRUQ7QUFDQSxRQUFNRixTQUFTSCxZQUFZQSxTQUFTSSxVQUFwQztBQUNBLFFBQUlELFVBQVVBLE9BQU9GLElBQVAsS0FBZ0IsYUFBOUIsRUFBNkM7QUFDekNELG1CQUFXRyxNQUFYO0FBQ0g7O0FBRURILGdCQUFZLENBQUNBLFNBQVNELE9BQXRCLElBQWlDQyxTQUFTSCxNQUFULEVBQWpDO0FBQ0gsQ0E3Q0Q7O0FBK0NBO0FBQ0E7O1FBRVNBLE0sR0FBQUEsTSIsImZpbGUiOiJ2YXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGdldE9iakl0ZW0sIG1hdGNoZXMgfSBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcblxuLyoqXG4gKiBJcyBpdCBlaXRoZXIgb2YgdGhlIHNpZGVzP1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gKiBAcGFyYW0ge29iamVjdH0gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IGxlZnRLZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSByaWdodEtleVxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuY29uc3QgaXNFaXRoZXJTaWRlID0gKG9wdHMsIHBhdGgsIGxlZnRLZXkgPSAnbGVmdCcsIHJpZ2h0S2V5ID0gJ3JpZ2h0JykgPT4ge1xuICAgIGNvbnN0IGxlZnQgPSBwYXRoLmdldChsZWZ0S2V5KTtcbiAgICBjb25zdCByaWdodCA9IHBhdGguZ2V0KHJpZ2h0S2V5KTtcbiAgICBjb25zdCBpZHNMZWZ0ID0gZ2V0T2JqSXRlbShsZWZ0KTtcbiAgICBjb25zdCBpZHNSaWdodCA9IGdldE9iakl0ZW0ocmlnaHQpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXNMZWZ0OiBtYXRjaGVzKG9wdHMsIGlkc0xlZnQuam9pbignLicpKSxcbiAgICAgICAgaXNSaWdodDogbWF0Y2hlcyhvcHRzLCBpZHNSaWdodC5qb2luKCcuJykpLFxuICAgICAgICBsZWZ0LCByaWdodFxuICAgIH07XG59O1xuXG4vKipcbiAqIFJlbW92ZSB2YXJcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdFxuICogQHBhcmFtIHthcnJheX0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqL1xuY29uc3QgcmVtb3ZlID0gKHQsIG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGlmICghcGF0aCB8fCBwYXRoLnJlbW92ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgdG9SZW1vdmU7XG5cbiAgICBpZiAocGF0aC50eXBlID09PSAnVmFyaWFibGVEZWNsYXJhdG9yJykge1xuICAgICAgICBjb25zdCBpc0l0ID0gaXNFaXRoZXJTaWRlKG9wdHMsIHBhdGgsICdpZCcsICdpbml0Jyk7XG4gICAgICAgIGlmICghaXNJdC5pc0xlZnQgJiYgIWlzSXQuaXNSaWdodCkgeyByZXR1cm47IH1cblxuICAgICAgICB0b1JlbW92ZSA9IHBhdGg7XG4gICAgfSBlbHNlIGlmIChwYXRoLnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicpIHtcbiAgICAgICAgLy8gV2Ugc2hvdWxkIGlnbm9yZSBpdCBmb3Igbm93Li4uIEl0IHdpbGwgYmUgY2hlY2tlZCBsYXRlclxuICAgICAgICBpZiAocGF0aC5nZXQoJ3JpZ2h0JykudHlwZSA9PT0gJ0xvZ2ljYWxFeHByZXNzaW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNJdCA9IGlzRWl0aGVyU2lkZShvcHRzLCBwYXRoKTtcbiAgICAgICAgaWYgKCFpc0l0LmlzTGVmdCAmJiAhaXNJdC5pc1JpZ2h0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRvUmVtb3ZlID0gcGF0aDtcblxuICAgICAgICAvLyBUbyBmaXggYSBidWcgd2l0aCBjbGFzc2VzXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRvUmVtb3ZlICYmIHRvUmVtb3ZlLnBhcmVudFBhdGg7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnR5cGUgPT09ICdDb25kaXRpb25hbEV4cHJlc3Npb24nKSB7XG4gICAgICAgICAgICB0b1JlbW92ZSA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGF0aC50eXBlID09PSAnQmluYXJ5RXhwcmVzc2lvbicpIHtcbiAgICAgICAgY29uc3QgaXNJdCA9IGlzRWl0aGVyU2lkZShvcHRzLCBwYXRoKTtcbiAgICAgICAgaWYgKCFpc0l0LmlzTGVmdCAmJiAhaXNJdC5pc1JpZ2h0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRvUmVtb3ZlID0gcGF0aDtcbiAgICB9IGVsc2UgaWYgKHBhdGgudHlwZSA9PT0gJ0xvZ2ljYWxFeHByZXNzaW9uJykge1xuICAgICAgICBjb25zdCBpc0l0ID0gaXNFaXRoZXJTaWRlKG9wdHMsIHBhdGgpO1xuICAgICAgICBpZiAoIWlzSXQuaXNMZWZ0ICYmICFpc0l0LmlzUmlnaHQpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdG9SZW1vdmUgPSBpc0l0LmlzTGVmdCAmJiBpc0l0LmxlZnQgfHwgaXNJdC5pc1JpZ2h0ICYmIGlzSXQucmlnaHQgfHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgaWYgaXQgaXMgYSBJZlN0YXRlbWVudFxuICAgIGNvbnN0IHBhcmVudCA9IHRvUmVtb3ZlICYmIHRvUmVtb3ZlLnBhcmVudFBhdGg7XG4gICAgaWYgKHBhcmVudCAmJiBwYXJlbnQudHlwZSA9PT0gJ0lmU3RhdGVtZW50Jykge1xuICAgICAgICB0b1JlbW92ZSA9IHBhcmVudDtcbiAgICB9XG5cbiAgICB0b1JlbW92ZSAmJiAhdG9SZW1vdmUucmVtb3ZlZCAmJiB0b1JlbW92ZS5yZW1vdmUoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IHsgcmVtb3ZlIH07XG4iXX0=