import { createAction } from './createAction';

interface actionInterface {
  type: symbol,
  payload?: any,
  error?: any
}

const updateState = (updates : object, state : object, action : actionInterface) => {
  const updateMethod = updates[action.type];
  if (updateMethod) {
    return updateMethod(state, action);
  }
  return state;
}

export const createReducer = (initState, updates = {}) => {
  return (state = initState, action) => {
    return updateState(updates, state, action);
  }
}

export const createAsyncReducer = (types : symbol[], initState : object = {}, updates) => {
  const [ request, success, fail ] = types;
  const defaultUpdates : object = {
    [request]: (state : object) => Object.assign({}, state, { loading: true }),
    [success]: (state: object, action) => Object.assign({}, state, {
      ...action.payload,
      loading: false,
    }),
    [fail]: (state: object, action) => Object.assign({}, state, {
      error: action.error,
      loading: false
    })
  }

  return createReducer(initState, Object.assign({}, defaultUpdates, updates))
}