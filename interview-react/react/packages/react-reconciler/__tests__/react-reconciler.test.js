'use strict';

const reactReconciler = require('..');
const assert = require('assert').strict;

assert.strictEqual(reactReconciler(), 'Hello from reactReconciler');
console.info('reactReconciler tests passed');
