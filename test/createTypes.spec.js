import test from 'ava'
import { createTypes } from '../src/createTypes'

test('create types', t => {
  const types = createTypes(3);
  const [request, success, fail] = types;
  t.is(typeof request, 'symbol')
  t.is(typeof success, 'symbol')
  t.is(typeof fail, 'symbol')
})