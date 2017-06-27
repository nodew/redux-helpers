import test from 'ava'
import { createAction, createAsyncAction } from '../src/createAction'
import { createTypes } from '../src/createTypes'

test('create sync action', t => {
  const [type] = createTypes()
  const action = createAction(type)
  const a = action(42)
  t.deepEqual(a, {
    type: type,
    payload: 42
  })
})

test('create async action', t => {
  const types = createTypes(3)
  const p = (data) => {
    return new Promise(resolve => {
      resolve(data)
    })
  }
  const action = createAsyncAction(types, p)
  const a = action({ test: 42 })
  t.is(a.types, types)
  return a.promise.then((result) => {
    t.deepEqual(result, { test: 42 })
  })
})

