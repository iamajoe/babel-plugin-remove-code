'use strict';
/* global describe it before after beforeEach afterEach */

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { transformFileSync } from 'babel-core';

// --------------------------------
// Variables

const dataDir = path.join(__dirname, 'data', 'var');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('remove-code.vars', () => {
    let actual;

    before(() => {
        const mockPath = path.join(dataDir, 'mock.js');
        actual = transformFileSync(mockPath).code;

        fs.writeFileSync(path.join(dataDir, '_tmp_test.js'), actual, { encoding: 'UTF-8' });
    });

    it('should remove var', () => {
        expect(actual).to.not.contain('const stripA = ');
        expect(actual).to.not.contain('let stripB;');
        expect(actual).to.not.contain('stripB =');
        expect(actual).to.not.contain('export const stripC = {};');
    });

    it('should maintain other vars', () => {
        expect(actual).to.contain('const keepA =');
        expect(actual).to.contain('let keepB;');
        expect(actual).to.contain('keepB = \'foo\';');
        expect(actual).to.contain('export const keepC = {};');
    });

    it('should remove variable reference usages', () => {
        expect(actual).to.not.contain('export { stripD };');
        expect(actual).to.not.contain('export default { stripA, keepA };');
        expect(actual).to.not.contain('console.log(stripA);');
    });

    it('should maintain other vars reference usages', () => {
        expect(actual).to.contain('export { keepD };');
        expect(actual).to.contain('export default { keepA };');
        expect(actual).to.contain('console.log(keepA);');
    });

    it('should remove expressions', () => {
        expect(actual).to.not.contain('if (stripA === ');
        expect(actual).to.not.contain('if (stripB === \'foo\' && ');
        expect(actual).to.not.contain('keepA = stripA;');
        expect(actual).to.not.contain('keepB = stripB && ');
    });

    it('should maintain other expressions', () => {
        expect(actual).to.contain('if (keepA === \'foo\')');
        expect(actual).to.contain('if (keepB === \'foo\')');
        expect(actual).to.contain('keepB = keepB;');
    });
});
