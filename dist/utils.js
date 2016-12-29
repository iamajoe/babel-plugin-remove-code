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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJnb1VwUm9vdCIsInBhdGgiLCJ0eXBlcyIsIm1heCIsInJpZ2h0UGF0aCIsImxhc3RPZlR5cGUiLCJ1bmRlZmluZWQiLCJpIiwicGFyZW50UGF0aCIsInR5cGUiLCJpbmRleE9mIiwicmVtb3ZlZCIsImdvVXAiLCJnZXRPYmpJdGVtIiwiYXJyIiwidG9DaGVjayIsIm5hbWUiLCJub2RlIiwib2JqZWN0IiwiY29uY2F0IiwicHJvcGVydHkiLCJpZCIsImxlZnQiLCJnZXRzQXJySXRlbSIsIm9wdHMiLCJwcm9wZXJ0aWVzIiwicmlnaHRQcm9wZXJ0eSIsImxlbmd0aCIsInZhbHVlIiwiZ2V0IiwibG9jYWwiLCJwYXJzZVBhdGgiLCJvcHRzQXJyIiwibWFwIiwidmFsIiwibmV3QXJyIiwic3BsaXQiLCJyZXZlcnNlIiwiY2hlY2siLCJmaWx0ZXIiLCJjVmFsIiwiYWN0dWFsUGF0aCIsIm9iaktleXMiLCJpc0l0Iiwiam9pbiIsInJlbW92ZSIsInQiLCJhY3R1YWxUeXBlIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFRQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsSUFBRCxFQUErQjtBQUFBLFFBQXhCQyxLQUF3Qix1RUFBaEIsRUFBZ0I7QUFBQSxRQUFaQyxHQUFZLHVFQUFOLENBQU07O0FBQzVDLFFBQUlDLFlBQVlILElBQWhCO0FBQ0EsUUFBSUksYUFBYUMsU0FBakI7O0FBRUE7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUosR0FBcEIsRUFBeUJJLEtBQUssQ0FBOUIsRUFBaUM7QUFDN0JILG9CQUFZQSxVQUFVSSxVQUF0Qjs7QUFFQSxZQUFJLENBQUNKLFNBQUQsSUFBYyxDQUFDQSxVQUFVSyxJQUE3QixFQUFtQztBQUMvQjtBQUNIOztBQUVEO0FBQ0EsWUFBSVAsTUFBTVEsT0FBTixDQUFjTixVQUFVSyxJQUF4QixNQUFrQyxDQUFD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VzlCLE9BQTFCLElBQXFDOEIsV0FBV0ksTUFBWCxFQUFyQztBQUNILENBTEQ7O0FBT0E7QUFDQTs7UUFFU2pDLEksR0FBQUEsSTtRQUFNWixRLEdBQUFBLFE7UUFBVStCLFMsR0FBQUEsUztRQUFXbEIsVSxHQUFBQSxVO1FBQVlVLFcsR0FBQUEsVztRQUFhc0IsTSxHQUFBQSxNIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogR29lcyB1cCB0byBmaW5kIGEgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcGFyYW0ge2FycmF5fSB0eXBlc1xuICogQHBhcmFtIHtpbnR9IG1heFxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuY29uc3QgZ29VcFJvb3QgPSAocGF0aCwgdHlwZXMgPSBbXSwgbWF4ID0gNSkgPT4ge1xuICAgIGxldCByaWdodFBhdGggPSBwYXRoO1xuICAgIGxldCBsYXN0T2ZUeXBlID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gTGV0cyBnZXQgdGhlIGV4cHJlc3Npb24gc3RhdGVtZW50XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgICAgICByaWdodFBhdGggPSByaWdodFBhdGgucGFyZW50UGF0aDtcblxuICAgICAgICBpZiAoIXJpZ2h0UGF0aCB8fCAhcmlnaHRQYXRoLnR5cGUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGV0cyBjaGVjayBmb3IgdGhlIHR5cGVcbiAgICAgICAgaWYgKHR5cGVzLmluZGV4T2YocmlnaHRQYXRoLnR5cGUpICE9PSAtMSAmJiAhcmlnaHRQYXRoLnJlbW92ZWQpIHtcbiAgICAgICAgICAgIGxhc3RPZlR5cGUgPSByaWdodFBhdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgYSBtYXggb2YgaXRlcmFjdGlvbnNcbiAgICAgICAgaSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0T2ZUeXBlO1xufTtcblxuLyoqXG4gKiBHb2VzIHVwIHRvIGZpbmQgYSB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEBwYXJhbSB7YXJyYXl9IHR5cGVzXG4gKiBAcGFyYW0ge2ludH0gbWF4XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5jb25zdCBnb1VwID0gKHBhdGgsIHR5cGVzID0gW10sIG1heCA9IDUpID0+IHtcbiAgICBsZXQgcmlnaHRQYXRoID0gcGF0aCB8fCB7fTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICAvLyBMZXRzIGdldCB0aGUgZXhwcmVzc2lvbiBzdGF0ZW1lbnRcbiAgICB3aGlsZSAodHlwZXMuaW5kZXhPZihyaWdodFBhdGgudHlwZSkgPT09IC0xKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gYnJlYWsgaWYgd2UndmUgZ29uZSB0b28gZmFyXG4gICAgICAgIGlmIChtYXggPT09IGkgfHwgIXJpZ2h0UGF0aC50eXBlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExldHMgZ2V0IHRoZSBuZXh0IG9uZVxuICAgICAgICByaWdodFBhdGggPSByaWdodFBhdGgucGFyZW50UGF0aCB8fCB7fTtcblxuICAgICAgICAvLyBTZXQgYSBtYXggb2YgaXRlcmFjdGlvbnNcbiAgICAgICAgaSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiByaWdodFBhdGgudHlwZSAmJiAhcmlnaHRQYXRoLnJlbW92ZWQgJiYgcmlnaHRQYXRoIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogR2V0cyBtZW1iZXIgZXhwcmVzc2lvbiBrZXlzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqIEByZXR1cm5zIHthcnJheX1cbiAqL1xuY29uc3QgZ2V0T2JqSXRlbSA9IChwYXRoKSA9PiB7XG4gICAgbGV0IGFyciA9IFtdO1xuICAgIGxldCB0b0NoZWNrO1xuXG4gICAgaWYgKCFwYXRoKSB7IHJldHVybiBhcnI7IH1cblxuICAgIC8vIEZvciB0aGUgaWRlbnRpZmllciBsaWtlcy4uLlxuICAgIGFyciA9IChwYXRoLnR5cGUgPT09ICdJZGVudGlmaWVyJykgPyBbcGF0aC5uYW1lIHx8IHBhdGgubm9kZS5uYW1lXSA6IGFycjtcblxuICAgIC8vIExldHMgY2hlY2sgdW5kZXIgb3RoZXIgcG9zc2libGUga2V5c1xuICAgIHRvQ2hlY2sgPSBwYXRoLm9iamVjdCB8fCBwYXRoLm5vZGUgJiYgcGF0aC5ub2RlLm9iamVjdDtcbiAgICBhcnIgPSB0b0NoZWNrID8gYXJyLmNvbmNhdChnZXRPYmpJdGVtKHRvQ2hlY2spKSA6IGFycjtcblxuICAgIHRvQ2hlY2sgPSBwYXRoLnByb3BlcnR5IHx8IHBhdGgubm9kZSAmJiBwYXRoLm5vZGUucHJvcGVydHk7XG4gICAgYXJyID0gdG9DaGVjayA/IGFyci5jb25jYXQoZ2V0T2JqSXRlbSh0b0NoZWNrKSkgOiBhcnI7XG5cbiAgICB0b0NoZWNrID0gcGF0aC5pZCB8fCBwYXRoLm5vZGUgJiYgcGF0aC5ub2RlLmlkO1xuICAgIGFyciA9IHRvQ2hlY2sgPyBhcnIuY29uY2F0KGdldE9iakl0ZW0odG9DaGVjaykpIDogYXJyO1xuXG4gICAgdG9DaGVjayA9IHBhdGgubGVmdCB8fCBwYXRoLm5vZGUgJiYgcGF0aC5ub2RlLmxlZnQ7XG4gICAgYXJyID0gdG9DaGVjayA/IGFyci5jb25jYXQoZ2V0T2JqSXRlbSh0b0NoZWNrKSkgOiBhcnI7XG5cbiAgICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBHZXRzIHByb3BlcnR5XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcGFyYW0ge2FycmF5fSBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBnZXRzQXJySXRlbSA9IChvcHRzLCBwYXRoLCBwcm9wZXJ0aWVzKSA9PiB7XG4gICAgbGV0IHJpZ2h0UHJvcGVydHk7XG5cbiAgICAvLyBHbyB0aHJvdWdoIGVhY2ggcHJvcGVydHlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBsZXQgdG9DaGVjaztcblxuICAgICAgICB0b0NoZWNrID0gKHByb3BlcnR5LnR5cGUgPT09ICdJZGVudGlmaWVyJykgJiYgcHJvcGVydHk7XG4gICAgICAgIHRvQ2hlY2sgPSB0b0NoZWNrIHx8IHByb3BlcnR5Lm5vZGUudmFsdWUgJiYgcHJvcGVydHkuZ2V0KCd2YWx1ZScpO1xuICAgICAgICB0b0NoZWNrID0gdG9DaGVjayB8fCBwcm9wZXJ0eS5ub2RlLmxvY2FsICYmIHByb3BlcnR5LmdldCgnbG9jYWwnKTtcbiAgICAgICAgdG9DaGVjayA9IHRvQ2hlY2sgfHwgcHJvcGVydHkubm9kZS5pZCAmJiBwcm9wZXJ0eS5nZXQoJ2lkJyk7XG4gICAgICAgIHRvQ2hlY2sgPSB0b0NoZWNrICYmIHRvQ2hlY2subm9kZSAmJiB0b0NoZWNrLm5vZGUubmFtZTtcblxuICAgICAgICBpZiAob3B0cy5pbmRleE9mKHRvQ2hlY2spID09PSAtMSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJdCB3YXMgZm91bmQhXG4gICAgICAgIHJpZ2h0UHJvcGVydHkgPSAocHJvcGVydGllcy5sZW5ndGggPiAxKSA/IHByb3BlcnR5IDogcGF0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmlnaHRQcm9wZXJ0eTtcbn07XG5cbi8qKlxuICogQ2hlY2sgZm9yIG5hbWUgaW4gb3B0aW9uc1xuICpcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKiBAcmV0dXJucyB7cGF0aH1cbiAqL1xuY29uc3QgcGFyc2VQYXRoID0gKG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGlmICghb3B0cy5sZW5ndGggfHwgIXBhdGgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXG4gICAgY29uc3Qgb3B0c0FyciA9IG9wdHMubWFwKCh2YWwpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXJyID0gdmFsLnNwbGl0KCcuJykucmV2ZXJzZSgpO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGFjdHVhbGx5IGV4aXN0cyBzb21ldGhpbmcgd2l0aCB0aGUgcGF0aCBuYW1lXG4gICAgICAgIGNvbnN0IGNoZWNrID0gbmV3QXJyLmZpbHRlcihjVmFsID0+IGNWYWwuaW5kZXhPZihwYXRoLm5vZGUubmFtZSB8fCBwYXRoLm5vZGUudmFsdWUpICE9PSAtMSk7XG5cbiAgICAgICAgLy8gTm8gbmVlZCB0byBnbyBmdXJ0aGVyIGlmIGl0IGlzbid0IGFuIG9iamVjdFxuICAgICAgICBpZiAoY2hlY2subGVuZ3RoICYmIG5ld0Fyci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9IGVsc2UgaWYgKCFjaGVjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgZm9yIHBvc3NpYmxlIG9iamVjdHMgbm93Li4uXG4gICAgICAgIC8vIExldHMgZ2V0IHRoZSByb290IE1lbWJlckV4cHJlc3Npb25cbiAgICAgICAgY29uc3QgYWN0dWFsUGF0aCA9IGdvVXBSb290KHBhdGgsIFsnTWVtYmVyRXhwcmVzc2lvbiddLCBuZXdBcnIubGVuZ3RoICsgMSk7XG4gICAgICAgIGNvbnN0IG9iaktleXMgPSBnZXRPYmpJdGVtKGFjdHVhbFBhdGgpO1xuXG4gICAgICAgIC8vIEl0IG1heSBub3QgaGF2ZSBrZXlzIGZvciBzb21lIHJlYXNvblxuICAgICAgICBpZiAoIW9iaktleXMubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIC8vIExldHMgc2VlIGlmIHRoZSBvYmplY3QgaXMgdGhlIHNhbWVcbiAgICAgICAgY29uc3QgbmFtZSA9IHBhdGgubm9kZS5uYW1lIHx8IHBhdGgubm9kZS52YWx1ZTtcbiAgICAgICAgY29uc3QgaXNJdCA9IG5hbWUgPT09IG9iaktleXNbMF0gJiYgbmV3QXJyLmpvaW4oJy4nKSA9PT0gb2JqS2V5cy5qb2luKCcuJyk7XG4gICAgICAgIHJldHVybiBpc0l0ID8gYWN0dWFsUGF0aCA6IGZhbHNlO1xuICAgIH0pLmZpbHRlcih2YWwgPT4gISF2YWwpO1xuXG4gICAgLy8gUmV0dXJuIHRoZSBhY3R1YWwgcGF0aFxuICAgIGNvbnN0IGFjdHVhbFBhdGggPSBvcHRzQXJyWzBdO1xuICAgIHJldHVybiBhY3R1YWxQYXRoICYmICFhY3R1YWxQYXRoLnJlbW92ZWQgJiYgYWN0dWFsUGF0aCB8fCB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBvZiBnZW5lcmFsXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKi9cbmNvbnN0IHJlbW92ZSA9ICh0LCBvcHRzID0gW10sIHBhdGgsIGFjdHVhbFR5cGUgPSBbXSkgPT4ge1xuICAgIGNvbnN0IGFjdHVhbFBhdGggPSBnb1VwKHBhcnNlUGF0aChvcHRzLCBwYXRoKSwgYWN0dWFsVHlwZSk7XG5cbiAgICAvLyBOb3cgbGV0cyBhY3R1YWxseSByZW1vdmVcbiAgICBhY3R1YWxQYXRoICYmICFhY3R1YWxQYXRoLnJlbW92ZWQgJiYgYWN0dWFsUGF0aC5yZW1vdmUoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IHsgZ29VcCwgZ29VcFJvb3QsIHBhcnNlUGF0aCwgZ2V0T2JqSXRlbSwgZ2V0c0Fyckl0ZW0sIHJlbW92ZSB9O1xuIl19