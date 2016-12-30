'use strict';

import { getsArrItem } from '../utils.js';

// -----------------------------------------
// Functions

/**
 * Remove export
 *
 * @param {object} t
 * @param {array} opts
 * @param {object} path
 */
const remove = (t, opts = [], path) => {
    if (!path || path.removed) { return; }

    let toRemove;

    if (path.type === 'ExportNamedDeclaration' || path.type === 'ExportDefaultDeclaration') {
        let properties;

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
        toRemove = properties.length && getsArrItem(opts, path, properties);
        toRemove = toRemove || [];
        toRemove = toRemove.filter(val => !!val && !val.removed);
    }

    if (toRemove && toRemove.length) {
        for (let i = 0; i < toRemove.length; i += 1) {
            toRemove[i] && !toRemove[i].removed && toRemove[i].remove();
        }
    }
};

// -----------------------------------------
// Export

export { remove };
