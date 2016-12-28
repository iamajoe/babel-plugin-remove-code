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

/**
 * Trims string and makes it line break insensitive
 *
 * @param {string} str
 * @returns {string}
 */
const trim = (str) => str.replace(/^\s+|\s+$/, '').replace(/\r?\n|\r/g, '');

// --------------------------------
// Suite of tests

describe.skip('remove-code.vars', () => {
    let actual;
    let expected;

    before(() => {
        const actualPath = path.join(dataDir, 'actual.js');

        actual = transformFileSync(actualPath).code;
        expected = fs.readFileSync(path.join(dataDir, 'expected.js')).toString();
    });

    it('should remove var', () => {
        expect(actual).to.not.contain('const simple');
        expect(actual).to.not.contain('export const bar');
        expect(actual).to.not.contain('test1: () => {');
    });

    it('should maintain other vars', () => {
        expect(actual).to.contain('let foo;');
        expect(actual).to.contain('foo = \'bar\';');
        expect(actual).to.contain('foo = \'foo\';');
        expect(actual).to.contain('console.log(foo);');
        expect(actual).to.contain('export { foo };');
    });

    it('should remove variable reference usages', () => {
        expect(actual).to.not.contain('console.log(bar);');
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

    // TODO: Other stuff to set yet
    it.skip('should be what is expected', () => {
        fs.writeFileSync(path.join(dataDir, '_tmp_test.js'), actual, { encoding: 'UTF-8' });

        // For line break insensitve
        // TODO: We should improve and make it work with the lines also
        expect(trim(actual)).to.equal(trim(expected));
    });
});
