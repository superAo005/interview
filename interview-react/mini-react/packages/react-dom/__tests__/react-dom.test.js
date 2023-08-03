'use strict';

const reactDom = require('..');
const assert = require('assert').strict;

assert.strictEqual(reactDom(), 'Hello from reactDom');
console.info('reactDom tests passed');
