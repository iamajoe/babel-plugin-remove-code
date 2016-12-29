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
        expect(actual).to.not.contain('import fsB from "stripB"');
        expect(actual).to.not.contain('import { fsCProxy as foo } from "stripC"');
        expect(actual).to.not.contain('import "stripD"');
    });

    it('should maintain other vars and import', () => {
        expect(actual).to.contain('import { fkA } from "keepA"');
        expect(actual).to.contain('import fkB from "keepB"');
        expect(actual).to.contain('import { fkCProxy as fkC } from "keepC"');
        expect(actual).to.contain('import "keepD"');
    });
});
