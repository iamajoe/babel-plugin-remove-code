'use strict';
/* global describe it before after beforeEach afterEach */

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { transformFileSync } from 'babel-core';

// --------------------------------
// Variables

const dataDir = path.join(__dirname, 'data', 'function');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('remove-code.function', () => {
    let actual;

    before(() => {
        const mockPath = path.join(dataDir, 'mock.js');
        actual = transformFileSync(mockPath).code;

        fs.writeFileSync(path.join(dataDir, '_tmp_test.js'), actual, { encoding: 'UTF-8' });
    });

    it('should remove function declarations', () => {
        expect(actual).to.not.contain('function stripA');
        expect(actual).to.not.contain('const keepB = function stripB');
    });

    it('should remove function calls', () => {
        expect(actual).to.not.contain('stripA()');
        expect(actual).to.not.contain('console.keepC.stripC(\'foo\')');
        expect(actual).to.not.contain('console.stripD(\'bar\')');
    });

    it('should maintain other vars and functions', () => {
        expect(actual).to.contain('function keepA');
        expect(actual).to.contain('const keepB');
        expect(actual).to.contain('console.keepC(\'foo\')');
        expect(actual).to.contain('console.stripD.keepD(\'bar\')');
        expect(actual).to.contain('const exists = true;');
    });
});
