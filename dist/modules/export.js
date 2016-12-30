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

    if (!path || path.removed) {
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
        toRemove = toRemove || [];
        toRemove = toRemove.filter(function (val) {
            return !!val && !val.removed;
        });
    }

    if (toRemove && toRemove.length) {
        for (var i = 0; i < toRemove.length; i += 1) {
            toRemove[i] && !toRemove[i].removed && toRemove[i].remove();
        }
    }
};

// -----------------------------------------
// Export

exports.remove = remove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2R1bGVzL2V4cG9ydC5qcyJdLCJuYW1lcyI6WyJyZW1vdmUiLCJ0Iiwib3B0cyIsInBhdGgiLCJyZW1vdmVkIiwidG9SZW1vdmUiLCJ0eXBlIiwicHJvcGVydGllcyIsImRlY2xhcmF0aW9uIiwibm9kZSIsImdldCIsImRlY2xhcmF0aW9ucyIsInNwZWNpZmllcnMiLCJsZW5ndGgiLCJmaWx0ZXIiLCJ2YWwiLCJpIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUFPQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsQ0FBRCxFQUF3QjtBQUFBLFFBQXBCQyxJQUFvQix1RUFBYixFQUFhO0FBQUEsUUFBVEMsSUFBUzs7QUFDbkMsUUFBSSxDQUFDQSxJQUFELElBQVNBLEtBQUtDLE9BQWxCLEVBQTJCO0FBQUU7QUFBUzs7QUFFdEMsUUFBSUMsaUJBQUo7O0FBRUEsUUFBSUYsS0FBS0csSUFBTCxLQUFjLHdCQUFkLElBQTBDSCxLQUFLRyxJQUFMLEtBQWMsMEJBQTVELEVBQXdGO0FBQ3BGLFlBQUlDLG1CQUFKOztBQUVBO0FBQ0EsWUFBSSxDQUFDLENBQUNKLEtBQUtLLFdBQVAsSUFBc0IsQ0FBQyxDQUFDTCxLQUFLTSxJQUFMLENBQVVELFdBQXRDLEVBQW1EO0FBQy9DRCx5QkFBYUosS0FBS08sR0FBTCxDQUFTLGFBQVQsQ0FBYjs7QUFFQSxnQkFBSSxDQUFDLENBQUNILFdBQVdJLFlBQWIsSUFBNkIsQ0FBQyxDQUFDSixXQUFXRSxJQUFYLENBQWdCRSxZQUFuRCxFQUFpRTtBQUM3REosNkJBQWFBLFdBQVdHLEdBQVgsQ0FBZSxjQUFmLENBQWI7QUFDSCxhQUZELE1BRU8sSUFBSSxDQUFDLENBQUNILFdBQVdBLFVBQWIsSUFBMkIsQ0FBQyxDQUFDQSxXQUFXRSxJQUFYLENBQWdCRixVQUFqRCxFQUE2RDtBQUNoRUEsNkJBQWFBLFdBQVdHLEdBQVgsQ0FBZSxZQUFmLENBQWI7QUFDSDtBQUNKLFNBUkQsTUFRTyxJQUFJLENBQUMsQ0FBQ1AsS0FBS1MsVUFBUCxJQUFxQixDQUFDLENBQUNULEtBQUtNLElBQUwsQ0FBVUcsVUFBckMsRUFBaUQ7QUFDcERMLHlCQUFhSixLQUFLTyxHQUFMLENBQVMsWUFBVCxDQUFiO0FBQ0g7O0FBRUQ7QUFDQUwsbUJBQVdFLFdBQVdNLE1BQVgsSUFBcUIsd0JBQVlYLElBQVosRUFBa0JDLElBQWxCLEVBQXdCSSxVQUF4QixDQUFoQztBQUNBRixtQkFBV0EsWUFBWSxFQUF2QjtBQUNBQSxtQkFBV0EsU0FBU1MsTUFBVCxDQUFnQjtBQUFBLG1CQUFPLENBQUMsQ0FBQ0MsR0FBRixJQUFTLENBQUNBLElBQUlYLE9BQXJCO0FBQUEsU0FBaEIsQ0FBWDtBQUNIOztBQUVELFFBQUlDLFlBQVlBLFNBQVNRLE1BQXpCLEVBQWlDO0FBQzdCLGFBQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJWCxTQUFTUSxNQUE3QixFQUFxQ0csS0FBSyxDQUExQyxFQUE2QztBQUN6Q1gscUJBQVNXLENBQVQsS0FBZSxDQUFDWCxTQUFTVyxDQUFULEVBQVlaLE9BQTVCLElBQXVDQyxTQUFTVyxDQUFULEVBQVloQixNQUFaLEVBQXZDO0FBQ0g7QUFDSjtBQUNKLENBaENEOztBQWtDQTtBQUNBOztRQUVTQSxNLEdBQUFBLE0iLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBnZXRzQXJySXRlbSB9IGZyb20gJy4uL3V0aWxzLmpzJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEZ1bmN0aW9uc1xuXG4vKipcbiAqIFJlbW92ZSBleHBvcnRcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdFxuICogQHBhcmFtIHthcnJheX0gb3B0c1xuICogQHBhcmFtIHtvYmplY3R9IHBhdGhcbiAqL1xuY29uc3QgcmVtb3ZlID0gKHQsIG9wdHMgPSBbXSwgcGF0aCkgPT4ge1xuICAgIGlmICghcGF0aCB8fCBwYXRoLnJlbW92ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgdG9SZW1vdmU7XG5cbiAgICBpZiAocGF0aC50eXBlID09PSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbicgfHwgcGF0aC50eXBlID09PSAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJykge1xuICAgICAgICBsZXQgcHJvcGVydGllcztcblxuICAgICAgICAvLyBMZXRzIGdldCB0aGUgcmlnaHQgYXJyYXkgdG8gaXRlcmF0ZSB0aHJvdWdoXG4gICAgICAgIGlmICghIXBhdGguZGVjbGFyYXRpb24gfHwgISFwYXRoLm5vZGUuZGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwYXRoLmdldCgnZGVjbGFyYXRpb24nKTtcblxuICAgICAgICAgICAgaWYgKCEhcHJvcGVydGllcy5kZWNsYXJhdGlvbnMgfHwgISFwcm9wZXJ0aWVzLm5vZGUuZGVjbGFyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMuZ2V0KCdkZWNsYXJhdGlvbnMnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoISFwcm9wZXJ0aWVzLnByb3BlcnRpZXMgfHwgISFwcm9wZXJ0aWVzLm5vZGUucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzLmdldCgncHJvcGVydGllcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhcGF0aC5zcGVjaWZpZXJzIHx8ICEhcGF0aC5ub2RlLnNwZWNpZmllcnMpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwYXRoLmdldCgnc3BlY2lmaWVycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm93IG1heWJlIHdlIGhhdmUgc29tZXRoaW5nIHRvIHJlbW92ZSFcbiAgICAgICAgdG9SZW1vdmUgPSBwcm9wZXJ0aWVzLmxlbmd0aCAmJiBnZXRzQXJySXRlbShvcHRzLCBwYXRoLCBwcm9wZXJ0aWVzKTtcbiAgICAgICAgdG9SZW1vdmUgPSB0b1JlbW92ZSB8fCBbXTtcbiAgICAgICAgdG9SZW1vdmUgPSB0b1JlbW92ZS5maWx0ZXIodmFsID0+ICEhdmFsICYmICF2YWwucmVtb3ZlZCk7XG4gICAgfVxuXG4gICAgaWYgKHRvUmVtb3ZlICYmIHRvUmVtb3ZlLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvUmVtb3ZlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB0b1JlbW92ZVtpXSAmJiAhdG9SZW1vdmVbaV0ucmVtb3ZlZCAmJiB0b1JlbW92ZVtpXS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRcblxuZXhwb3J0IHsgcmVtb3ZlIH07XG4iXX0=