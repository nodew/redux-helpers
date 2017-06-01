import test from 'ava';
import {
  createTypes,
  createAsyncType,
  createAsyncTypes
} from '../src/createTypes';

test('create types', t => {
  t.deepEqual(createTypes(['A', 'B']), {
    A: 'A',
    B: 'B'
  })
  t.deepEqual(createTypes(['A', 'B'], 'TEST'), {
    TEST_A: 'TEST_A',
    TEST_B: 'TEST_B'
  })
})

test('create async type', t => {
  t.deepEqual(createAsyncType('A', 'TEST'), {
    TEST_A: 'TEST_A',
    TEST_A_SUCCESS: 'TEST_A_SUCCESS', 
    TEST_A_FAIL: 'TEST_A_FAIL'
  })
})

test('create async types', t => {
  t.deepEqual(createAsyncType('A', 'TEST'), {
    TEST_A: 'TEST_A',
    TEST_A_SUCCESS: 'TEST_A_SUCCESS', 
    TEST_A_FAIL: 'TEST_A_FAIL'
  })

  t.deepEqual(createAsyncTypes(['A', 'B'], 'TEST'), {
    TEST_A: 'TEST_A',
    TEST_A_SUCCESS: 'TEST_A_SUCCESS', 
    TEST_A_FAIL: 'TEST_A_FAIL',
    TEST_B: 'TEST_B',
    TEST_B_SUCCESS: 'TEST_B_SUCCESS', 
    TEST_B_FAIL: 'TEST_B_FAIL'
  })
})