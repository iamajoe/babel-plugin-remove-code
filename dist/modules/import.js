'use strict';

// -----------------------------------------
// Functions

/**
 * Remove import
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var remove = function remove(t) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var path = arguments[2];

  var source = path && path.source || path && path.node.source;
  if (!source || !source.value) {
    return;
  }

  // It doesn't exist in the options
  if (opts.indexOf(source.value) === -1) {
    return;
  }

  !path.removed && path.remove();
};

// -----------------------------------------
// Export

exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2ltcG9ydC5qcyJdLCJuYW1lcyI6WyJyZW1vdmUiLCJ0Iiwib3B0cyIsInBhdGgiLCJzb3VyY2UiLCJub2RlIiwidmFsdWUiLCJpbmRleE9mIiwicmVtb3ZlZCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUFPQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsQ0FBRCxFQUF3QjtBQUFBLE1BQXBCQyxJQUFvQix1RUFBYixFQUFhO0FBQUEsTUFBVEMsSUFBUzs7QUFDbkMsTUFBTUMsU0FBU0QsUUFBUUEsS0FBS0MsTUFBYixJQUF1QkQsUUFBUUEsS0FBS0UsSUFBTCxDQUFVRCxNQUF4RDtBQUNBLE1BQUksQ0FBQ0EsTUFBRCxJQUFXLENBQUNBLE9BQU9FLEtBQXZCLEVBQThCO0FBQUU7QUFBUzs7QUFFekM7QUFDQSxNQUFJSixLQUFLSyxPQUFMLENBQWFILE9BQU9FLEtBQXBCLE1BQStCLENBQUMsQ0FBcEMsRUFBdUM7QUFBRTtBQUFTOztBQUVsRCxHQUFDSCxLQUFLSyxPQUFOLElBQWlCTCxLQUFLSCxNQUFMLEVBQWpCO0FBQ0gsQ0FSRDs7QUFVQTtBQUNBOztRQUVTQSxNLEdBQUFBLE0iLCJmaWxlIjoiaW1wb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRnVuY3Rpb25zXG5cbi8qKlxuICogUmVtb3ZlIGltcG9ydFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0XG4gKiBAcGFyYW0ge2FycmF5fSBvcHRzXG4gKiBAcGFyYW0ge29iamVjdH0gcGF0aFxuICovXG5jb25zdCByZW1vdmUgPSAodCwgb3B0cyA9IFtdLCBwYXRoKSA9PiB7XG4gICAgY29uc3Qgc291cmNlID0gcGF0aCAmJiBwYXRoLnNvdXJjZSB8fCBwYXRoICYmIHBhdGgubm9kZS5zb3VyY2U7XG4gICAgaWYgKCFzb3VyY2UgfHwgIXNvdXJjZS52YWx1ZSkgeyByZXR1cm47IH1cblxuICAgIC8vIEl0IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIG9wdGlvbnNcbiAgICBpZiAob3B0cy5pbmRleE9mKHNvdXJjZS52YWx1ZSkgPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgIXBhdGgucmVtb3ZlZCAmJiBwYXRoLnJlbW92ZSgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydFxuXG5leHBvcnQgeyByZW1vdmUgfTtcbiJdfQ==