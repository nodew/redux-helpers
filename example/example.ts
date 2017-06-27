import {
  applyMiddleware,
  createStore,
  bindActionCreators
} from 'redux';
import {
  createAsyncAction,
  createAsyncReducer,
  createTypes,
  asyncMiddleware
} from '../src'

const types = createTypes(3);
const reducer = createAsyncReducer(types, {}, {});

const test = createAsyncAction(types, (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  })
});

const store = createStore(
  reducer,
  {},
  applyMiddleware(asyncMiddleware)
)

let t = bindActionCreators(test, store.dispatch)

t({ res: 11 });
setTimeout(function() {
  console.log(store.getState());
}, 500);

setTimeout(function() {
  console.log(store.getState());
}, 2000);


