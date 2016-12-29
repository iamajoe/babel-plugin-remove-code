'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = undefined;

var _utils = require('../utils.js');

// -----------------------------------------
// Functions

/**
 * Remove export
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

    if (path.type === 'ExportNamedDeclaration' || path.type === 'ExportDefaultDeclaration') {
        var properties = void 0;

        // Lets get the right array to iterate through
        if (!!path.declaration || !!path.node.declaration) {
            properties = path.get('declaration');

            if (!!properties.declarations || !!properties.node.declarations) {
                properties = properties.get('declarations');
            } else if (!!properties.properties || !!properties.node.properties) {
                properties = properties.get('properties');
            }
        } else if (!!path.specifiers || !!path.node.specifiers) {
            properties = path.get('specifiers');
        }

        // Now maybe we have something to remove!
        toRemove = properties.length && (0, _utils.getsArrItem)(opts, path, properties);
    }

    toRemove && !toRemove.removed && toRemove.remove();
};

// -----------------------------------------
// Export

exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2V4cG9ydC5qcyJdLCJuYW1lcyI6WyJyZW1vdmUiLCJ0Iiwib3B0cyIsInBhdGgiLCJ0b1JlbW92ZSIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiZGVjbGFyYXRpb24iLCJub2RlIiwiZ2V0IiwiZGVjbGFyYXRpb25zIiwic3BlY2lmaWVycyIsImxlbmd0aCIsInJlbW92ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQU9BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxDQUFELEVBQXdCO0FBQUEsUUFBcEJDLElBQW9CLHVFQUFiLEVBQWE7QUFBQSxRQUFUQyxJQUFTOztBQUNuQyxRQUFJLENBQUNBLElBQUwsRUFBVztBQUFFO0FBQVM7O0FBRXRCLFFBQUlDLGlCQUFKOztBQUVBLFFBQUlELEtBQUtFLElBQUwsS0FBYyx3QkFBZCxJQUEwQ0YsS0FBS0UsSUFBTCxLQUFjLDBCQUE1RCxFQUF3RjtBQUNwRixZQUFJQyxtQkFBSjs7QUFFQTtBQUNBLFlBQUksQ0FBQyxDQUFDSCxLQUFLSSxXQUFQLElBQXNCLENBQUMsQ0FBQ0osS0FBS0ssSUFBTCxDQUFVRCxXQUF0QyxFQUFtRDtBQUMvQ0QseUJBQWFILEtBQUtNLEdBQUwsQ0FBUyxhQUFULENBQWI7O0FBRUEsZ0JBQUksQ0FBQyxDQUFDSCxXQUFXSSxZQUFiLElBQTZCLENBQUMsQ0FBQ0osV0FBV0UsSUFBWCxDQUFnQkUsWUFBbkQsRUFBaUU7QUFDN0RKLDZCQUFhQSxXQUFXRyxHQUFYLENBQWUsY0FBZixDQUFiO0FBQ0gsYUFGRCxNQUVPLElBQUksQ0FBQyxDQUFDSCxXQUFXQSxVQUFiLElBQTJCLENBQUMsQ0FBQ0EsV0FBV0UsSUFBWCxDQUFnQkYsVUFBakQsRUFBNkQ7QUFDaEVBLDZCQUFhQSxXQUFXRyxHQUFYLENBQWUsWUFBZixDQUFiO0FBQ0g7QUFDSixTQVJELE1BUU8sSUFBSSxDQUFDLENBQUNOLEtBQUtRLFVBQVAsSUFBcUIsQ0FBQyxDQUFDUixLQUFLSyxJQUFMLENBQVVHLFVBQXJDLEVBQWlEO0FBQ3BETCx5QkFBYUgsS0FBS00sR0FBTCxDQUFTLFlBQVQsQ0FBYjtBQUNIOztBQUVEO0FBQ0FMLG1CQUFXRSxXQUFXTSxNQUFYLElBQXFCLHdCQUFZVixJQUFaLEVBQWtCQyxJQUFsQixFQUF3QkcsVUFBeEIsQ0FBaEM7QUFDSDs7QUFFREYsZ0JBQVksQ0FBQ0EsU0FBU1MsT0FBdEIsSUFBaUNULFNBQVNKLE1BQVQsRUFBakM7QUFDSCxDQTFCRDs7QUE0QkE7QUFDQTs7UUFFU0EsTSxHQUFBQSxNIiwiZmlsZSI6ImV4cG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgZ2V0c0Fyckl0ZW0gfSBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBGdW5jdGlvbnNcblxuLyoqXG4gKiBSZW1vdmUgZXhwb3J0XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRcbiAqIEBwYXJhbSB7YXJyYXl9IG9wdHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXRoXG4gKi9cbmNvbnN0IHJlbW92ZSA9ICh0LCBvcHRzID0gW10sIHBhdGgpID0+IHtcbiAgICBpZiAoIXBhdGgpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgdG9SZW1vdmU7XG5cbiAgICBpZiAocGF0aC50eXBlID09PSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbicgfHwgcGF0aC50eXBlID09PSAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJykge1xuICAgICAgICBsZXQgcHJvcGVydGllcztcblxuICAgICAgICAvLyBMZXRzIGdldCB0aGUgcmlnaHQgYXJyYXkgdG8gaXRlcmF0ZSB0aHJvdWdoXG4gICAgICAgIGlmICghIXBhdGguZGVjbGFyYXRpb24gfHwgISFwYXRoLm5vZGUuZGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwYXRoLmdldCgnZGVjbGFyYXRpb24nKTtcblxuICAgICAgICAgICAgaWYgKCEhcHJvcGVydGllcy5kZWNsYXJhdGlvbnMgfHwgISFwcm9wZXJ0aWVzLm5vZGUuZGVjbGFyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMuZ2V0KCdkZWNsYXJhdGlvbnMnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoISFwcm9wZXJ0aWVzLnByb3BlcnRpZXMgfHwgISFwcm9wZXJ0aWVzLm5vZGUucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzLmdldCgncHJvcGVydGllcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhcGF0aC5zcGVjaWZpZXJzIHx8ICEhcGF0aC5ub2RlLnNwZWNpZmllcnMpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwYXRoLmdldCgnc3BlY2lmaWVycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm93IG1heWJlIHdlIGhhdmUgc29tZXRoaW5nIHRvIHJlbW92ZSFcbiAgICAgICAgdG9SZW1vdmUgPSBwcm9wZXJ0aWVzLmxlbmd0aCAmJiBnZXRzQXJySXRlbShvcHRzLCBwYXRoLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG5cbiAgICB0b1JlbW92ZSAmJiAhdG9SZW1vdmUucmVtb3ZlZCAmJiB0b1JlbW92ZS5yZW1vdmUoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IHsgcmVtb3ZlIH07XG4iXX0=