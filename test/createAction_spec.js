import test from 'ava';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { 
  createAction, 
  createAsyncAction, 
  createActions 
} from '../src/createAction';
import { createTypes, createAsyncTypes } from '../src/createTypes';

let store;
let dispatch;
let actionTypes;

test.beforeEach(t => {
  // --------- reducers
  const testA = (state = {}, action) => {
    switch (action.type) {
      case 'T_A':
        return Object.assign({}, state, {
          v: action.payload
        })
      default:
        return state
    }
  };

  const testC = (state = {}, action) => {
    switch (action.type) {
      case 'T_C':
        return Object.assign({}, state, { loading: true })
      case 'T_C_SUCCESS':
        return Object.assign({}, state, {
          v: action.payload,
          loading: false
        })
      case 'T_C_FAIL':
        return Object.assign({}, state, {
          error: action.payload,
          loading: false
        })
      default:
        return state
    }
  };

  const rootReducers = combineReducers({
    testA,
    testC
  });

  // ---------- store
  store = createStore(
    rootReducers,
    applyMiddleware(thunk)
  );

  // --------- action
  actionTypes = {
    ...createTypes(['A', 'B'], 'T'),
    ...createAsyncTypes(['C', 'D'], 'T')
  }

  dispatch = store.dispatch;
});

test('sync action', t => {
  const actionA = createAction(actionTypes.T_A);
  dispatch(actionA('123'));
  t.deepEqual(
    store.getState().testA,
    { v: '123' }
  );
})

test('sync create actions', t => {
  const { testA, testB, other } = createActions({
    TEST: {
      A: (a, b) => ({ v: a + b }),
      B: [
        (c) => ({ v: c }),
        (c) => ({ m: c })
      ]
    },
  }, 'OTHER');

  t.deepEqual(testA(1, 2), {
    type: 'TEST/A',
    payload: {
      v: 3
    },
  })

  t.deepEqual(testB(1), {
    type: 'TEST/B',
    payload: {
      v: 1
    },
    meta: {
      m: 1
    }
  })

  t.deepEqual(other('o'), {
    type: 'OTHER',
    payload: 'o',
  })
})

test('async action', t => {
  const actionC = createAsyncAction(actionTypes.T_C)(
    (state) => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(100);
      }, 1000);
    })
  );
  return dispatch(actionC()).then(() => {
    t.deepEqual(
      store.getState().testC,
      { v: 100, loading: false }
    )
  })
})

test.afterEach(t => {
  store = {};
  dispatch = () => {};
});

