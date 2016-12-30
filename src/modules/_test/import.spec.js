'use strict';
/* global describe it before after beforeEach afterEach */

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { transformFileSync } from 'babel-core';

// --------------------------------
// Variables

const dataDir = path.join(__dirname, 'data', 'import');

// --------------------------------
// Functions

// --------------------------------
// Suite of tests

describe('remove-code.import', () => {
    let actual;

    before(() => {
        const mockPath = path.join(dataDir, 'mock.js');
        actual = transformFileSync(mockPath).code;

        fs.writeFileSync(path.join(dataDir, '_tmp_test.js'), actual, { encoding: 'UTF-8' });
    });

    it('should remove import declarations', () => {
        expect(actual).to.not.contain('import { fsA } from "stripA"');
        expect(actual).to.not.contain('import { fsB } from "stripBPattern"');
        expect(actual).to.not.contain('fsB(');
        expect(actual).to.not.contain('import fsC from "stripC"');
        expect(actual).to.not.contain('console.log(fsC)');
        expect(actual).to.not.contain('import fsD from "stripDPattern"');
        expect(actual).to.not.contain('const fsDVar = fsD');
        expect(actual).to.not.contain('import { fsEProxy as fsE } from "stripE"');
        expect(actual).to.not.contain('import { fsFProxy as fsF } from "stripFPattern"');
        expect(actual).to.not.contain('import "stripG"');
        expect(actual).to.not.contain('import "stripHPattern"');
        expect(actual).to.not.contain('const keepI = fsF(fkF())');
        expect(actual).to.not.contain('const keepJ = fkF(fsF())');
    });

    it('should maintain other vars and import', () => {
        expect(actual).to.contain('import { fkA } from "keepA"');
        expect(actual).to.contain('import { fkB } from "keepBPattern"');
        expect(actual).to.contain('fkB(\'foo\')');
        expect(actual).to.contain('import fkC from "keepC"');
        expect(actual).to.contain('console.log(fkC)');
        expect(actual).to.contain('import fkD from "keepDPattern"');
        expect(actual).to.contain('const fkDVar = fkD');
        expect(actual).to.contain('import { fkEProxy as fkE } from "keepE"');
        expect(actual).to.contain('import { fkFProxy as fkF } from "keepFPattern"');
        expect(actual).to.contain('import "keepG";');
        expect(actual).to.contain('import "keepHPattern"');
        expect(actual).to.contain('const keepI;');
        expect(actual).to.contain('const keepJ = fkF()');
    });
});
