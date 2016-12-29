'use strict';
/* global describe it before after beforeEach afterEach */

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { transformFileSync } from 'babel-core';

// --------------------------------
// Variables

const dataDir = path.join(__dirname, 'data', 'assign');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('remove-code.assign', () => {
    let actual;

    before(() => {
        const mockPath = path.join(dataDir, 'mock.js');
        actual = transformFileSync(mockPath).code;

        fs.writeFileSync(path.join(dataDir, '_tmp_test.js'), actual, { encoding: 'UTF-8' });
    });

    it('should remove assigns', () => {
        expect(actual).to.not.contain('stripA =');
        expect(actual).to.not.contain('stripB =');
    });

    it('should maintain declarations', () => {
        expect(actual).to.contain('let stripA');
        expect(actual).to.contain('const stripB');
        expect(actual).to.contain('const stripC');
    });

    it('should maintain other vars', () => {
        expect(actual).to.contain('keepA = ');
        expect(actual).to.contain('const keepB =');
        expect(actual).to.contain('const keepC =');
    });
});
