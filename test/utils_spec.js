import test from 'ava';
import { toCamelCase } from '../src/utils';

test('to camelcase', t => {
  t.is(toCamelCase('TEST_TEST_CASE'), 'testTestCase');
});