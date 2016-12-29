'use strict';

// -----------------------------------------
// Functions

/**
 * Goes up to find a type
 *
 * @param {object} path
 * @param {array} types
 * @param {int} max
 * @returns {object}
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var goUpRoot = function goUpRoot(path) {
    var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    var rightPath = path;
    var lastOfType = undefined;

    // Lets get the expression statement
    for (var i = 0; i < max; i += 1) {
        rightPath = rightPath.parentPath;

        if (!rightPath || !rightPath.type) {
            break;
        }

        // Lets check for the type
        if (types.indexOf(rightPath.type) !== -1 && !rightPath.removed) {
            lastOfType = rightPath;
        }

        // Set a max of iteractions
        i += 1;
    }

    return lastOfType;
};

/**
 * Goes up to find a type
 *
 * @param {object} path
 * @param {array} types
 * @param {int} max
 * @returns {object}
 */
var goUp = function goUp(path) {
    var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    var rightPath = path || {};
    var i = 0;

    // Lets get the expression statement
    while (types.indexOf(rightPath.type) === -1) {
        // We need to break if we've gone too far
        if (max === i || !rightPath.type) {
            break;
        }

        // Lets get the next one
        rightPath = rightPath.parentPath || {};

        // Set a max of iteractions
        i += 1;
    }

    return rightPath.type && !rightPath.removed && rightPath || undefined;
};

/**
 * Gets member expression keys
 *
 * @param {object} path
 * @returns {array}
 */
var getObjItem = function getObjItem(path) {
    var arr = [];
    var toCheck = void 0;

    if (!path) {
        return arr;
    }

    // For the identifier likes...
    arr = path.type === 'Identifier' ? [path.name || path.node.name] : arr;

    // Lets check under other possible keys
    toCheck = path.object || path.node && path.node.object;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.property || path.node && path.node.property;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.id || path.node && path.node.id;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.left || path.node && path.node.left;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    toCheck = path.right || path.node && path.node.right;
    arr = toCheck ? arr.concat(getObjItem(toCheck)) : arr;

    return arr;
};

/**
 * Gets property
 *
 * @param {object} opts
 * @param {object} path
 * @param {array} properties
 * @returns
 */
var getsArrItem = function getsArrItem(opts, path, properties) {
    var rightProperty = void 0;

    // Go through each property
    for (var i = 0; i < properties.length; i += 1) {
        var property = properties[i];
        var toCheck = void 0;

        toCheck = property.type === 'Identifier' && property;
        toCheck = toCheck || property.node.value && property.get('value');
        toCheck = toCheck || property.node.local && property.get('local');
        toCheck = toCheck || property.node.id && property.get('id');
        toCheck = toCheck && toCheck.node && toCheck.node.name;

        if (opts.indexOf(toCheck) === -1) {
            continue;
        }

        // It was found!
        rightProperty = properties.length > 1 ? property : path;
    }

    return rightProperty;
};

/**
 * Check for name in options
 *
 * @param {array} opts
 * @param {object} path
 * @returns {path}
 */
var parsePath = function parsePath() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var path = arguments[1];

    if (!opts.length || !path) {
        return undefined;
    }

    var optsArr = opts.map(function (val) {
        var newArr = val.split('.').reverse();

        // Check if actually exists something with the path name
        var check = newArr.filter(function (cVal) {
            return cVal.indexOf(path.node.name || path.node.value) !== -1;
        });

        // No need to go further if it isn't an object
        if (check.length && newArr.length === 1) {
            return path;
        } else if (!check.length) {
            return false;
        }

        // We need to check for possible objects now...
        // Lets get the root MemberExpression
        var actualPath = goUpRoot(path, ['MemberExpression'], newArr.length + 1);
        var objKeys = getObjItem(actualPath);

        // It may not have keys for some reason
        if (!objKeys.length) {
            return false;
        }

        // Lets see if the object is the same
        var name = path.node.name || path.node.value;
        var isIt = name === objKeys[0] && newArr.join('.') === objKeys.join('.');
        return isIt ? actualPath : false;
    }).filter(function (val) {
        return !!val;
    });

    // Return the actual path
    var actualPath = optsArr[0];
    return actualPath && !actualPath.removed && actualPath || undefined;
};

/**
 * Remove of general
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
var remove = function remove(t) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var path = arguments[2];
    var actualType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    var actualPath = goUp(parsePath(opts, path), actualType);

    // Now lets actually remove
    actualPath && !actualPath.removed && actualPath.remove();
};

// -----------------------------------------
// Export

exports.goUp = goUp;
exports.goUpRoot = goUpRoot;
exports.parsePath = parsePath;
exports.getObjItem = getObjItem;
exports.getsArrItem = getsArrItem;
exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJnb1VwUm9vdCIsInBhdGgiLCJ0eXBlcyIsIm1heCIsInJpZ2h0UGF0aCIsImxhc3RPZlR5cGUiLCJ1bmRlZmluZWQiLCJpIiwicGFyZW50UGF0aCIsInR5cGUiLCJpbmRleE9mIiwicmVtb3ZlZCIsImdvVXAiLCJnZXRPYmpJdGVtIiwiYXJyIiwidG9DaGVjayIsIm5hbWUiLCJub2RlIiwib2JqZWN0IiwiY29uY2F0IiwicHJvcGVydHkiLCJpZCIsImxlZnQiLCJyaWdodCIsImdldHNBcnJJdGVtIiwib3B0cyIsInByb3BlcnRpZXMiLCJyaWdodFByb3BlcnR5IiwibGVuZ3RoIiwidmFsdWUiLCJnZXQiLCJsb2NhbCIsInBhcnNlUGF0aCIsIm9wdHNBcnIiLCJtYXAiLCJ2YWwiLCJuZXdBcnIiLCJzcGxpdCIsInJldmVyc2UiLCJjaGVjayIsImZpbHRlciIsImNWYWwiLCJhY3R1YWxQYXRoIiwib2JqS2V5cyIsImlzSXQiLCJqb2luIiwicmVtb3ZlIiwidCIsImFjdHVhbFR5cGUiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQVFBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxJQUFELEVBQStCO0FBQUEsUUFBeEJDLEtBQXdCLHVFQUFoQixFQUFnQjtBQUFBLFFBQVpDLEdBQVksdUVBQU4sQ0FBTTs7QUFDNUMsUUFBSUMsWUFBWUgsSUFBaEI7QUFDQSxRQUFJSSxhQUFhQyxTQUFqQjs7QUFFQTtBQUNBLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSixHQUFwQixFQUF5QkksS0FBSyxDQUE5QixFQUFpQztBQUM3Qkgsb0JBQVlBLFVBQVVJLFVBQXRCOztBQUVBLFlBQUksQ0FBQ0osU0FBRCxJQUFjLENBQUNBLFVBQVVLLElBQTdCLEVBQW1DO0FBQy9CO0FBQ0g7O0FBRUQ7QUFDQSxZQUFJUCxNQUFNUSxPQUFOLENBQWNOLFVBQVVLLElBQXhCLE1B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QUFBLFFBQTFCeEIsSUFBMEI7QUFBQSxRQUFwQitDLFVBQW9CLHVFQUFQLEVBQU87O0FBQ3BELFFBQU1OLGFBQWE5QixLQUFLb0IsVUFBVVAsSUFBVixFQUFnQnhCLElBQWhCLENBQUwsRUFBNEIrQyxVQUE1QixDQUFuQjs7QUFFQTtBQUNBTixrQkFBYyxDQUFDQSxXQUFXL0IsT0FBMUIsSUFBcUMrQixXQUFXSSxNQUFYLEVBQXJDO0FBQ0gsQ0FMRDs7QUFPQTtBQUNBOztRQUVTbEMsSSxHQUFBQSxJO1FBQU1aLFEsR0FBQUEsUTtRQUFVZ0MsUyxHQUFBQSxTO1FBQVduQixVLEdBQUFBLFU7UUFBWVcsVyxHQUFBQSxXO1FBQWFzQixNLEdBQUFBLE0iLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcblxuLyoqXG4gKiBHb2VzIHVwIHRvIGZpbmQgYSB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEBwYXJhbSB7YXJyYXl9IHR5cGVzXG4gKiBAcGFyYW0ge2ludH0gbWF4XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5jb25zdCBnb1VwUm9vdCA9IChwYXRoLCB0eXBlcyA9IFtdLCBtYXggPSA1KSA9PiB7XG4gICAgbGV0IHJpZ2h0UGF0aCA9IHBhdGg7XG4gICAgbGV0IGxhc3RPZlR5cGUgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBMZXRzIGdldCB0aGUgZXhwcmVzc2lvbiBzdGF0ZW1lbnRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSArPSAxKSB7XG4gICAgICAgIHJpZ2h0UGF0aCA9IHJpZ2h0UGF0aC5wYXJlbnRQYXRoO1xuXG4gICAgICAgIGlmICghcmlnaHRQYXRoIHx8ICFyaWdodFBhdGgudHlwZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBMZXRzIGNoZWNrIGZvciB0aGUgdHlwZVxuICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihyaWdodFBhdGgudHlwZSkgIT09IC0xICYmICFyaWdodFBhdGgucmVtb3ZlZCkge1xuICAgICAgICAgICAgbGFzdE9mVHlwZSA9IHJpZ2h0UGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBhIG1heCBvZiBpdGVyYWN0aW9uc1xuICAgICAgICBpICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RPZlR5cGU7XG59O1xuXG4vKipcbiAqIEdvZXMgdXAgdG8gZmluZCBhIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGF0aFxuICogQHBhcmFtIHthcnJheX0gdHlwZXNcbiAqIEBwYXJhbSB7aW50fSBtYXhcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cbmNvbnN0IGdvVXAgPSAocGF0aCwgdHlwZXMgPSBbXSwgbWF4ID0gNSkgPT4ge1xuICAgIGxldCByaWdodFBhdGggPSBwYXRoIHx8IHt9O1xuICAgIGxldCBpID0gMDtcblxuICAgIC8vIExldHMgZ2V0IHRoZSBleHByZXNzaW9uIHN0YXRlbWVudFxuICAgIHdoaWxlICh0eXBlcy5pbmRleE9mKHJpZ2h0UGF0aC50eXBlKSA9PT0gLTEpIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBicmVhayBpZiB3ZSd2ZSBnb25lIHRvbyBmYXJcbiAgICAgICAgaWYgKG1heCA9PT0gaSB8fCAhcmlnaHRQYXRoLnR5cGUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGV0cyBnZXQgdGhlIG5leHQgb25lXG4gICAgICAgIHJpZ2h0UGF0aCA9IHJpZ2h0UGF0aC5wYXJlbnRQYXRoIHx8IHt9O1xuXG4gICAgICAgIC8vIFNldCBhIG1heCBvZiBpdGVyYWN0aW9uc1xuICAgICAgICBpICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJpZ2h0UGF0aC50eXBlICYmICFyaWdodFBhdGgucmVtb3ZlZCAmJiByaWdodFBhdGggfHwgdW5kZWZpbmVkO1xufTtcblxuLyoqXG4gKiBHZXRzIG1lbWJlciBleHByZXNzaW9uIGtleXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGF0aFxuICogQHJldHVybnMge2FycmF5fVxuICovXG5jb25zdCBnZXRPYmpJdGVtID0gKHBhdGgpID0+IHtcbiAgICBsZXQgYXJyID0gW107XG4gICAgbGV0IHRvQ2hlY2s7XG5cbiAgICBpZiAoIXBhdGgpIHsgcmV0dXJuIGFycjsgfVxuXG4gICAgLy8gRm9yIHRoZSBpZGVudGlmaWVyIGxpa2VzLi4uXG4gICAgYXJyID0gKHBhdGgudHlwZSA9PT0gJ0lkZW50aWZpZXInKSA/IFtwYXRoLm5hbWUgfHwgcGF0aC5ub2RlLm5hbWVdIDogYXJyO1xuXG4gICAgLy8gTGV0cyBjaGVjayB1bmRlciBvdGhlciBwb3NzaWJsZSBrZXlzXG4gICAgdG9DaGVjayA9IHBhdGgub2JqZWN0IHx8IHBhdGgubm9kZSAmJiBwYXRoLm5vZGUub2JqZWN0O1xuICAgIGFyciA9IHRvQ2hlY2sgPyBhcnIuY29uY2F0KGdldE9iakl0ZW0odG9DaGVjaykpIDogYXJyO1xuXG4gICAgdG9DaGVjayA9IHBhdGgucHJvcGVydHkgfHwgcGF0aC5ub2RlICYmIHBhdGgubm9kZS5wcm9wZXJ0eTtcbiAgICBhcnIgPSB0b0NoZWNrID8gYXJyLmNvbmNhdChnZXRPYmpJdGVtKHRvQ2hlY2spKSA6IGFycjtcblxuICAgIHRvQ2hlY2sgPSBwYXRoLmlkIHx8IHBhdGgubm9kZSAmJiBwYXRoLm5vZGUuaWQ7XG4gICAgYXJyID0gdG9DaGVjayA/IGFyci5jb25jYXQoZ2V0T2JqSXRlbSh0b0NoZWNrKSkgOiBhcnI7XG5cbiAgICB0b0NoZWNrID0gcGF0aC5sZWZ0IHx8IHBhdGgubm9kZSAmJiBwYXRoLm5vZGUubGVmdDtcbiAgICBhcnIgPSB0b0NoZWNrID8gYXJyLmNvbmNhdChnZXRPYmpJdGVtKHRvQ2hlY2spKSA6IGFycjtcblxuICAgIHRvQ2hlY2sgPSBwYXRoLnJpZ2h0IHx8IHBhdGgubm9kZSAmJiBwYXRoLm5vZGUucmlnaHQ7XG4gICAgYXJyID0gdG9DaGVjayA/IGFyci5jb25jYXQoZ2V0T2JqSXRlbSh0b0NoZWNrKSkgOiBhcnI7XG5cbiAgICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBHZXRzIHByb3BlcnR5XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcGFyYW0ge2FycmF5fSBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBnZXRzQXJySXRlbSA9IChvcHRzLCBwYXRoLCBwcm9wZXJ0aWVzKSA9PiB7XG4gICAgbGV0IHJpZ2h0UHJvcGVydHk7XG5cbiAgICAvLyBHbyB0aHJvdWdoIGVhY2ggcHJvcGVydHlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBsZXQgdG9DaGVjaztcblxuICAgICAgICB0b0NoZWNrID0gKHByb3BlcnR5LnR5cGUgPT09ICdJZGVudGlmaWVyJykgJiYgcHJvcGVydHk7XG4gICAgICAgIHRvQ2hlY2sgPSB0b0NoZWNrIHx8IHByb3BlcnR5Lm5vZGUudmFsdWUgJiYgcHJvcGVydHkuZ2V0KCd2YWx1ZScpO1xuICAgICAgICB0b0NoZWNrID0gdG9DaGVjayB8fCBwcm9wZXJ0eS5ub2RlLmxvY2FsICYmIHByb3BlcnR5LmdldCgnbG9jYWwnKTtcbiAgICAgICAgdG9DaGVjayA9IHRvQ2hlY2sgfHwgcHJvcGVydHkubm9kZS5pZCAmJiBwcm9wZXJ0eS5nZXQoJ2lkJyk7XG4gICAgICAgIHRvQ2hlY2sgPSB0b0NoZWNrICYmIHRvQ2hlY2subm9kZSAmJiB0b0NoZWNrLm5vZGUubmFtZTtcblxuICAgICAgICBpZiAob3B0cy5pbmRleE9mKHRvQ2hlY2spID09PSAtMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJdCB3YXMgZm91bmQhXG4gICAgICAgIHJpZ2h0UHJvcGVydHkgPSAocHJvcGVydGllcy5sZW5ndGggPiAxKSA/IHByb3BlcnR5IDogcGF0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmlnaHRQcm9wZXJ0eTtcbn07XG5cbi8qKlxuICogQ2hlY2sgZm9yIG5hbWUgaW4gb3B0aW9uc1xuICpcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcmV0dXJucyB7cGF0aH1cbiAqL1xuY29uc3QgcGFyc2VQYXRoID0gKG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGlmICghb3B0cy5sZW5ndGggfHwgIXBhdGgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXG4gICAgY29uc3Qgb3B0c0FyciA9IG9wdHMubWFwKCh2YWwpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyID0gdmFsLnNwbGl0KCcuJykucmV2ZXJzZSgpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGFjdHVhbGx5IGV4aXN0cyBzb21ldGhpbmcgd2l0aCB0aGUgcGF0aCBuYW1lXG4gICAgICAgIGNvbnN0IGNoZWNrID0gbmV3QXJyLmZpbHRlcihjVmFsID0+IGNWYWwuaW5kZXhPZihwYXRoLm5vZGUubmFtZSB8fCBwYXRoLm5vZGUudmFsdWUpICE9PSAtMSk7XG5cbiAgICAgICAgLy8gTm8gbmVlZCB0byBnbyBmdXJ0aGVyIGlmIGl0IGlzbid0IGFuIG9iamVjdFxuICAgICAgICBpZiAoY2hlY2subGVuZ3RoICYmIG5ld0Fyci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFjaGVjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgZm9yIHBvc3NpYmxlIG9iamVjdHMgbm93Li4uXG4gICAgICAgIC8vIExldHMgZ2V0IHRoZSByb290IE1lbWJlckV4cHJlc3Npb25cbiAgICAgICAgY29uc3QgYWN0dWFsUGF0aCA9IGdvVXBSb290KHBhdGgsIFsnTWVtYmVyRXhwcmVzc2lvbiddLCBuZXdBcnIubGVuZ3RoICsgMSk7XG4gICAgICAgIGNvbnN0IG9iaktleXMgPSBnZXRPYmpJdGVtKGFjdHVhbFBhdGgpO1xuXG4gICAgICAgIC8vIEl0IG1heSBub3QgaGF2ZSBrZXlzIGZvciBzb21lIHJlYXNvblxuICAgICAgICBpZiAoIW9iaktleXMubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIExldHMgc2VlIGlmIHRoZSBvYmplY3QgaXMgdGhlIHNhbWVcbiAgICAgICAgY29uc3QgbmFtZSA9IHBhdGgubm9kZS5uYW1lIHx8IHBhdGgubm9kZS52YWx1ZTtcbiAgICAgICAgY29uc3QgaXNJdCA9IG5hbWUgPT09IG9iaktleXNbMF0gJiYgbmV3QXJyLmpvaW4oJy4nKSA9PT0gb2JqS2V5cy5qb2luKCcuJyk7XG4gICAgICAgIHJldHVybiBpc0l0ID8gYWN0dWFsUGF0aCA6IGZhbHNlO1xuICAgIH0pLmZpbHRlcih2YWwgPT4gISF2YWwpO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBhY3R1YWwgcGF0aFxuICAgIGNvbnN0IGFjdHVhbFBhdGggPSBvcHRzQXJyWzBdO1xuICAgIHJldHVybiBhY3R1YWxQYXRoICYmICFhY3R1YWxQYXRoLnJlbW92ZWQgJiYgYWN0dWFsUGF0aCB8fCB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBvZiBnZW5lcmFsXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKi9cbmNvbnN0IHJlbW92ZSA9ICh0LCBvcHRzID0gW10sIHBhdGgsIGFjdHVhbFR5cGUgPSBbXSkgPT4ge1xuICAgIGNvbnN0IGFjdHVhbFBhdGggPSBnb1VwKHBhcnNlUGF0aChvcHRzLCBwYXRoKSwgYWN0dWFsVHlwZSk7XG5cbiAgICAvLyBOb3cgbGV0cyBhY3R1YWxseSByZW1vdmVcbiAgICBhY3R1YWxQYXRoICYmICFhY3R1YWxQYXRoLnJlbW92ZWQgJiYgYWN0dWFsUGF0aC5yZW1vdmUoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IHsgZ29VcCwgZ29VcFJvb3QsIHBhcnNlUGF0aCwgZ2V0T2JqSXRlbSwgZ2V0c0Fyckl0ZW0sIHJlbW92ZSB9O1xuIl19