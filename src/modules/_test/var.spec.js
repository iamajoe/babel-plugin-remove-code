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
        expect(actual).to.not.contain('const stripA =');
        expect(actual).to.not.contain('let stripB');
        expect(actual).to.not.contain('stripB =');
        expect(actual).to.not.contain('export const stripC =');
        expect(actual).to.not.contain('export { stripD }');
    });

    it('should maintain other vars', () => {
        expect(actual).to.contain('const keepA =');
        expect(actual).to.contain('let keepB');
        expect(actual).to.contain('keepB =');
        expect(actual).to.contain('export const keepC =');
        expect(actual).to.contain('export { keepD }');
    });

    it.skip('should remove variable reference usages', () => {
        expect(actual).to.not.contain('console.log(stripA);');
        expect(actual).to.not.contain('export default { stripA }');
    });

    // TODO: Expressions need to be done first
    it.skip('should remove expressions', () => {
        // TODO: These should be regex
        expect(actual).to.not.contain('bar ==');
        expect(actual).to.not.contain('bar !=');
        expect(actual).to.not.contain('bar ||');
        expect(actual).to.not.contain('bar &&');
        expect(actual).to.not.contain('!bar');
    });
});
