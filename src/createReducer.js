import { createAction } from './createAction';
import { isObject } from './utils';

const updateState = (updates, state, action) => {
  const updateMethods = Object.keys(updates);
  const updateMethod = updateMethods.find((m) => m === action.type);
  if (updateMethod) {
    return updateMethod(state, action.payload, action.meta);
  }
  return state;
}

export const createReducer = (initState, updates = {}) => {
  return (state = initState, action) => {
    return updateState(updates, state, action);
  }
}

export const createAsyncReducer = (baseType, initState, updates) => {
  return (state = initState, action) => {
    const success = `${baseType}_SUCCESS`;
    const fail = `${baseType}_FAIL`;
    switch (action.type) {
      case baseType:
        if (updates[baseType]) {
          return updates[baseType](state, action.payload, action.meta)
        } else {
          return assign({}, state, { loading: true });
        }
      case success:
        if (updates[success]) {
          return updates[success](state, action.payload, action.meta);
        } else {
          return assign({}, state, action.payload, { loading: false })
        }
      case fail:
        if (updates[fail]) {
          return updates[fail](state, action.payload, action.meta);
        } else {
          return assign({}, state, {
            error: { ...action.payload },
            loading: false
          });
        }
      default:
        return updateState(updates, state, action);
    }
  }
}