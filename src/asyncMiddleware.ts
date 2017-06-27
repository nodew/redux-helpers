export default ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, types, handler, ...rest } = action;
  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  let p = promise;

  if (handler) {
    p = promise.then(handler)
  }

  p.then(
    (result) => next({ ...rest, payload: result, type: SUCCESS }),
    (error) => next({ ...rest, error, type: FAILURE })
  ).catch((error)=> {
    console.error('MIDDLEWARE ERROR:', error);
    next({ ...rest, error, type: FAILURE });
  });

  return promise;
};
