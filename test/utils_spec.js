import test from 'ava';
import { 
  toCamelCase,
  isArray,
  isFunction,
  isString,
  isObject
} from '../src/utils';

test('util toCamelCase', t => {
  t.is(toCamelCase('TEST_TEST_CASE'), 'testTestCase');
});

test('util isObject', t => {
  t.true(isObject({ a: 1 }));
  t.true(isObject([]));
  t.false(isObject(""));
  t.false(isObject(() => {}));
})

test('util isArray', t => {
  t.true(isArray([]));
  t.false(isArray({ a: 1 }));
  t.false(isArray(""));
  t.false(isArray(() => {}));
})

test('util isString', t => {
  t.true(isString(""));
  t.false(isString([]));
  t.false(isString({ a: 1 }));
  t.false(isString(() => {}));
})

test('util isFunction', t => {
  t.true(isFunction(() => {}));
  t.false(isFunction(""));
  t.false(isFunction([]));
  t.false(isFunction({ a: 1 }));
})