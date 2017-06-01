import { createAction } from './createAction';
import { isObject } from './utils';

export const createReducer = (initState, updates = {}) => {
  return (state = initState, action) => {
    const updateMethods = Object.keys(updates);
    const updateMethod = updateMethods.find((m) => m === action.type);
    if (updateMethod) {
      return updateMethod(state, action.payload, action.meta);
    }
    return state;
  }
}

export const createAsyncReducer = (baseType, initState, updates) => {
  return (state = initState, action) => {
    // switch (action.type) {
    //   state
    // }
  }
}