import test from 'ava'
import { createReducer, createAsyncReducer } from '../src/createReducer'
import { createTypes } from '../src/createTypes'

test('create reducer', t => {
  const [inc, dec] = createTypes(2);
  const initState = { n: 0 }
  const reducer = createReducer(initState, {
    [inc]: (state, action) => {
      return { n: state.n + 1 }
    },
    [dec]: (state, action) => {
      return { n: state.n - 1 }
    }
  })
  t.deepEqual(reducer(initState, { type: inc }), { n: 1 })
  t.deepEqual(reducer(initState, { type: dec }), { n: -1 })
})

test('create async reducer', t => {
  const types = createTypes(3)
  const [request, success, fail] = types
  const initState = {}
  const reducer = createAsyncReducer(types, initState, {
    [success]: (state, action) => {
      return { status: true, pending: false }
    },
    [fail]: (state, action) => {
      return { status: false, pending: false }
    }
  })
  t.deepEqual(reducer(initState, { type: request }), { pending: true })
  t.deepEqual(reducer(initState, { type: success }), { status: true, pending: false })
  t.deepEqual(reducer(initState, { type: fail }), { status: false, pending: false })
})