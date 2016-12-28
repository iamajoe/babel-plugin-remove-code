'use strict';

import path from 'path';
import glob from 'glob';

// --------------------------------
// Imports test modules

const specs = glob.sync('./src/**/*.spec.js');

// Now lets require it
specs.forEach(val => require(path.join(process.cwd(), val)));
