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
        expect(actual).to.not.contain('const stripA = \'foo\';');
        expect(actual).to.not.contain('const stripBPattern = \'foo\';');
        expect(actual).to.not.contain('let stripC;');
        expect(actual).to.not.contain('let stripFPattern;');
        expect(actual).to.not.contain('stripC = \'foo\';');
        expect(actual).to.not.contain('stripC = {};');
        expect(actual).to.not.contain('stripFPattern = \'foo\';');
        expect(actual).to.not.contain('stripFPattern = {};');
        expect(actual).to.not.contain('export const stripG = {};');
        expect(actual).to.not.contain('export const stripHPattern = {};');
        expect(actual).to.not.contain('export { stripD };');
        expect(actual).to.not.contain('export { stripIPattern };');
        expect(actual).to.not.contain('export default { stripA');
        expect(actual).to.not.contain('stripBPattern, keepBPattern };');
        expect(actual).to.not.contain('console.log(stripA);');
        expect(actual).to.not.contain('console.log(stripBPattern);');
        expect(actual).to.not.contain('if (stripA');
        expect(actual).to.not.contain('if (stripBPattern');
        expect(actual).to.not.contain('if (stripC');
        expect(actual).to.not.contain('if (stripFPattern');
        expect(actual).to.not.contain('keepA = stripA;');
        expect(actual).to.not.contain('keepB = stripB;');
        expect(actual).to.not.contain('stripIdentifier');
        expect(actual).to.not.contain('global.stripProp');
        expect(actual).to.not.contain('global[\'stripProp\']');
    });

    it('should maintain other vars', () => {
        expect(actual).to.contain('const keepA = \'foo\';');
        expect(actual).to.contain('const keepBPattern = \'foo\';');
        expect(actual).to.contain('let keepC;');
        expect(actual).to.contain('let keepFPattern;');
        expect(actual).to.contain('keepC = \'foo\';');
        expect(actual).to.contain('keepFPattern = \'foo\';');
        expect(actual).to.contain('export const keepG = {};');
        expect(actual).to.contain('export const keepHPattern = {};');
        expect(actual).to.contain('export { keepD };');
        expect(actual).to.contain('export { keepIPattern };');
        expect(actual).to.contain('export default { keepA, keepBPattern };');
        expect(actual).to.contain('console.log(keepA);');
        expect(actual).to.contain('console.log(keepBPattern);');
        expect(actual).to.contain('if (keepA === \'foo\') {}');
        expect(actual).to.contain('if (keepBPattern === \'foo\') {}');
        expect(actual).to.contain('if (keepC === \'foo\') {}');
        expect(actual).to.contain('if (keepFPattern === \'foo\') {}');
        expect(actual).to.contain('keepB = keepB;');
    });
});
