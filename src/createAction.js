import { 
  toCamelCase, 
  isArray,
  isFunction,
  isObject,
  isString,
} from './utils';

export const createAction = (type) => (payload) => {
  return {
    type,
    payload
  }
}

const createActionFromObj = (obj, preKey = '', actions = {}) => {
  return Object.keys(obj).reduce((acc, key) => {
    const curKey = preKey ? `${preKey}/${key}` : key;
    const value = obj[key];
    const name = toCamelCase(curKey);
    if (isFunction(value)) {
      acc[name] = (...args) => {
        return {
          type: curKey,
          payload: value(...args),
        }
      }
    }

    if (isArray(value) && value.length === 2) {
      acc[name] = (...args) => {
        return {
          type: curKey,
          payload: value[0](...args),
          meta: value[1](...args)
        }
      }
    }

    if (isObject(value)) {
      createActionFromObj(value, curKey, acc)
    }

    return acc;
  }, actions);
}

export const createActions = (...args) => {
  let actions = {};
  args.forEach(arg => {
    if (isString(arg)) {
      actions[toCamelCase(arg)] = createAction(arg);
    }
    if (isObject(arg)) {
      createActionFromObj(arg, '', actions)
    }
  })
  return actions;
}

export const createAsyncAction = (type) => (action) => (...args) => (dispatch, getState) => {
  let p;
  switch (typeof action) {
    case 'function': 
      p = action(...args)
      if (typeof p.then !== 'function') {
        throw new Error('action should return a Promise')
      }
      break;
    case 'object':
      if (typeof action.then === 'function') {
        return p = action;
      }
      throw new Error('action should be a Promise');
    default:
      throw new Error("type of action isn't right")
  }

  return p.then(payload => {
    return dispatch({
      type: `${type}_SUCCESS`,
      payload
    })
  }).catch(error => {
    return dispatch({
      type: `${type}_FAIL`,
      payload: error
    })
  })
}