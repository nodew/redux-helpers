# redux-helpers

## helper for create types

### sync action
```JavaScript
import { createTypes } from 'redux-helpers'
// createTypes(types, namespaces)
createTypes(['INC', 'DEC'], 'COUNT') 
=>  { 
      COUNT_INC: 'COUNT_INC',
      COUNT_DEC: 'COUNT_DEC'
    }
```

### async actions

```JavaScript
import { createAsyncTypes } from 'redux-helpers'
// createAsyncTypes(types, namespaces)
createAsyncTypes(['UPDATE', 'DELETE'], 'LIST') 
=>  { 
      LIST_UPDATE: 'LIST_UPDATE',
      LIST_UPDATE_SUCCESS: 'LIST_UPDATE_SUCCESS',
      LIST_UPDATE_FAIL: 'LIST_UPDATE_FAIL',
      LIST_DELETE: 'LIST_DELETE',
      LIST_DELETE_SUCCESS: 'LIST_DELETE_SUCCESS',
      LIST_DELETE_FAIL: 'LIST_DELETE_FAIL',
    }
```

## helper for create action

### sync action

```JavaScript
import { createAction, createActions } from 'redux-helpers'
// createAction(type)
const inc = createAction('INC');
inc(32) => { type: 'INC', payload: 32 }

const { countInc, countDown, countClean } = createActions({
  COUNT_INC: (value) => ({ v : value }),
  COUNT_DOWN: [
    (value) => ({ v: value }),
    (value) => ({ m: value })
  ]
}, 'COUNT_CLEAN')

countInc(32) => { type: 'COUNT_INC', payload: { v: 32 } }
countDown(32) => { type: 'COUNT_DOWN', payload: { v: 32 }, meta: { m: 32 } }
countClean() => { type: 'COUNT_CLEAN', payload: undefined }
```

### async action

Important: async action is depends on redux-thunk

``` JavaScript
import { createAsyncAction } from 'redux-helpers'
/* 
 * createAsyncAction is defined as below
 * const createAsyncAction = (type) => (action) => (dispatch, getState) => {}
 * first arg is `type`, if type is 'UPDATE', then it will dispath UPDATE when action was dispath, UPDATE_SUCCESS when success, UPDATE_FAIL when catch error
 * second arg is action, it's a promise or a function which return a promise
 */
const getList = fetch('/list')
const getList = createAsyncAction('GET_LIST')(update);
dispatch(getList())

const updateReq = (data) => post('/url', data)
const update = createAsyncAction('UPDATE')(updateReq)

dispatch(update({...}));
```

