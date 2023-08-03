'use strict';

const scheduler = require('..');
const assert = require('assert').strict;

assert.strictEqual(scheduler(), 'Hello from scheduler');
console.info('scheduler tests passed');
