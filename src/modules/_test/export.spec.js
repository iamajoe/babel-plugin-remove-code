'use strict';
/* global describe it before after beforeEach afterEach */

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { transformFileSync } from 'babel-core';

// --------------------------------
// Variables

const dataDir = path.join(__dirname, 'data', 'export');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('remove-code.export', () => {
    let actual;

    before(() => {
        const mockPath = path.join(dataDir, 'mock.js');
        actual = transformFileSync(mockPath).code;

        fs.writeFileSync(path.join(dataDir, '_tmp_test.js'), actual, { encoding: 'UTF-8' });
    });

    it('should remove export declarations', () => {
        expect(actual).to.not.contain('export const stripA');
        expect(actual).to.not.contain('export { stripB }');
        expect(actual).to.not.contain('export default { stripC }');
    });

    it('should maintain other vars and exports', () => {
        expect(actual).to.contain('export const keepA');
        expect(actual).to.contain('export { keepB }');
    });
});
