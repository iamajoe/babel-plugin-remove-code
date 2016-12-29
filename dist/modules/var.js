'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = undefined;

var _utils = require('../utils.js');

// -----------------------------------------
// Functions

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

    if (path.type === 'VariableDeclarator' || path.type === 'AssignmentExpression') {
        // It doesn't exist in the options
        var ids = (0, _utils.getObjItem)(path);
        if (opts.indexOf(ids.join('.')) === -1) {
            return;
        }

        !path.removed && path.remove();
    }
};

// -----------------------------------------
// Export

exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL3Zhci5qcyJdLCJuYW1lcyI6WyJyZW1vdmUiLCJ0Iiwib3B0cyIsInBhdGgiLCJ0eXBlIiwiaWRzIiwiaW5kZXhPZiIsImpvaW4iLCJyZW1vdmVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUFPQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsQ0FBRCxFQUF3QjtBQUFBLFFBQXBCQyxJQUFvQix1RUFBYixFQUFhO0FBQUEsUUFBVEMsSUFBUzs7QUFDbkMsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFBRTtBQUFTOztBQUV0QixRQUFJQSxLQUFLQyxJQUFMLEtBQWMsb0JBQWQsSUFBc0NELEtBQUtDLElBQUwsS0FBYyxzQkFBeEQsRUFBZ0Y7QUFDNUU7QUFDQSxZQUFNQyxNQUFNLHVCQUFXRixJQUFYLENBQVo7QUFDQSxZQUFJRCxLQUFLSSxPQUFMLENBQWFELElBQUlFLElBQUosQ0FBUyxHQUFULENBQWIsTUFBZ0MsQ0FBQyxDQUFyQyxFQUF3QztBQUFFO0FBQVM7O0FBRW5ELFNBQUNKLEtBQUtLLE9BQU4sSUFBaUJMLEtBQUtILE1BQUwsRUFBakI7QUFDSDtBQUNKLENBVkQ7O0FBWUE7QUFDQTs7UUFFU0EsTSxHQUFBQSxNIiwiZmlsZSI6InZhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgZ2V0T2JqSXRlbSB9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIFJlbW92ZSB2YXJcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdFxuICogQHBhcmFtIHthcnJheX0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqL1xuY29uc3QgcmVtb3ZlID0gKHQsIG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGlmICghcGF0aCkgeyByZXR1cm47IH1cblxuICAgIGlmIChwYXRoLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0b3InIHx8IHBhdGgudHlwZSA9PT0gJ0Fzc2lnbm1lbnRFeHByZXNzaW9uJykge1xuICAgICAgICAvLyBJdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBvcHRpb25zXG4gICAgICAgIGNvbnN0IGlkcyA9IGdldE9iakl0ZW0ocGF0aCk7XG4gICAgICAgIGlmIChvcHRzLmluZGV4T2YoaWRzLmpvaW4oJy4nKSkgPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgICAgICFwYXRoLnJlbW92ZWQgJiYgcGF0aC5yZW1vdmUoKTtcbiAgICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0XG5cbmV4cG9ydCB7IHJlbW92ZSB9O1xuIl19