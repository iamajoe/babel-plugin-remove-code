'use strict';
/* global describe it before after beforeEach afterEach */

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { transformFileSync } from 'babel-core';

// --------------------------------
// Variables

const dataDir = path.join(__dirname, 'data', 'debugger');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('remove-code.debugger', () => {
    let actual;

    before(() => {
        const mockPath = path.join(dataDir, 'mock.js');
        actual = transformFileSync(mockPath).code;

        fs.writeFileSync(path.join(dataDir, '_tmp_test.js'), actual, { encoding: 'UTF-8' });
    });

    it('shouldn\'t have any debugger', () => {
        expect(actual).to.not.contain('debugger;');
    });

    it('should maintain vars', () => {
        expect(actual).to.contain('const bar = \'foo\';');
        expect(actual).to.contain('let foo;');
        expect(actual).to.contain('if (bar === \'foo\') {');
        expect(actual).to.contain('export { foo };');
    });
});
