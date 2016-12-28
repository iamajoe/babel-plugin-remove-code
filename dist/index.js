'use strict';

// -----------------------------------------
// Functions

/**
 * Traverses up the tree
 *
 * @param {object} path
 * @returns {string}
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return { visitor: CodeVisitor };
};

var traverseUp = function traverseUp(path) {
    if (path.parentPath && path.parentPath.parentPath && path.parentPath.parentPath.parent) {
        return path.parentPath.parentPath.parent.type;
    }

    return undefined;
};

// -----------------------------------------
// The Visitor

var CodeVisitor = {
    Identifier: function Identifier(path) {
        var toRemove = this.opts.vars || [];

        for (var i = 0; i < toRemove.length; i += 1) {
            if (path.node.name === toRemove[i]) {
                if (traverseUp(path) === 'ExportNamedDeclaration') {
                    path.parentPath.remove();
                }
            }
        }
    }
};

// -----------------------------------------
// Export
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ2aXNpdG9yIiwiQ29kZVZpc2l0b3IiLCJ0cmF2ZXJzZVVwIiwicGF0aCIsInBhcmVudFBhdGgiLCJwYXJlbnQiLCJ0eXBlIiwidW5kZWZpbmVkIiwiSWRlbnRpZmllciIsInRvUmVtb3ZlIiwib3B0cyIsInZhcnMiLCJpIiwibGVuZ3RoIiwibm9kZSIsIm5hbWUiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O2tCQWtDZSxZQUFZO0FBQ3ZCLFdBQU8sRUFBRUEsU0FBU0MsV0FBWCxFQUFQO0FBQ0gsQzs7QUE5QkQsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQUNDLElBQUQsRUFBVTtBQUN6QixRQUFJQSxLQUFLQyxVQUFMLElBQW1CRCxLQUFLQyxVQUFMLENBQWdCQSxVQUFuQyxJQUFpREQsS0FBS0MsVUFBTCxDQUFnQkEsVUFBaEIsQ0FBMkJDLE1BQWhGLEVBQXdGO0FBQ3BGLGVBQU9GLEtBQUtDLFVBQUwsQ0FBZ0JBLFVBQWhCLENBQTJCQyxNQUEzQixDQUFrQ0MsSUFBekM7QUFDSDs7QUFFRCxXQUFPQyxTQUFQO0FBQ0gsQ0FORDs7QUFRQTtBQUNBOztBQUVBLElBQU1OLGNBQWM7QUFDaEJPLGNBRGdCLHNCQUNMTCxJQURLLEVBQ0M7QUFDYixZQUFNTSxXQUFXLEtBQUtDLElBQUwsQ0FBVUMsSUFBVixJQUFrQixFQUFuQzs7QUFFQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsU0FBU0ksTUFBN0IsRUFBcUNELEtBQUssQ0FBMUMsRUFBNkM7QUFDekMsZ0JBQUlULEtBQUtXLElBQUwsQ0FBVUMsSUFBVixLQUFtQk4sU0FBU0csQ0FBVCxDQUF2QixFQUFvQztBQUNoQyxvQkFBSVYsV0FBV0MsSUFBWCxNQUFxQix3QkFBekIsRUFBbUQ7QUFDL0NBLHlCQUFLQyxVQUFMLENBQWdCWSxNQUFoQjtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBWGUsQ0FBcEI7O0FBY0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIFRyYXZlcnNlcyB1cCB0aGUgdHJlZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCB0cmF2ZXJzZVVwID0gKHBhdGgpID0+IHtcbiAgICBpZiAocGF0aC5wYXJlbnRQYXRoICYmIHBhdGgucGFyZW50UGF0aC5wYXJlbnRQYXRoICYmIHBhdGgucGFyZW50UGF0aC5wYXJlbnRQYXRoLnBhcmVudCkge1xuICAgICAgICByZXR1cm4gcGF0aC5wYXJlbnRQYXRoLnBhcmVudFBhdGgucGFyZW50LnR5cGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUaGUgVmlzaXRvclxuXG5jb25zdCBDb2RlVmlzaXRvciA9IHtcbiAgICBJZGVudGlmaWVyKHBhdGgpIHtcbiAgICAgICAgY29uc3QgdG9SZW1vdmUgPSB0aGlzLm9wdHMudmFycyB8fCBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvUmVtb3ZlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAocGF0aC5ub2RlLm5hbWUgPT09IHRvUmVtb3ZlW2ldKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRyYXZlcnNlVXAocGF0aCkgPT09ICdFeHBvcnROYW1lZERlY2xhcmF0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBwYXRoLnBhcmVudFBhdGgucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHsgdmlzaXRvcjogQ29kZVZpc2l0b3IgfTtcbn1cbiJdfQ==