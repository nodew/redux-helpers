type promiseCreatorType = (...args: any[]) => Promise<any>;

interface syncAction {
  type: symbol,
  payload?: any,
}

type asyncAction = {
  types: symbol [],
  promise: Promise<any>,
  handler?: (...args : any[]) => Promise<any>
}

interface createActionFunc {
  (type: symbol) : ((payload : any) => syncAction)
}

export const createAction : createActionFunc = (type) => (payload) => {
  return {
    type,
    payload
  }
}

interface createAsyncActionFunc {
  (types : symbol[],
   promiseCreator : promiseCreatorType,
   handler? : (...args : any[]) => Promise<any>
  ) : ((...args : any[]) => asyncAction)
}

export const createAsyncAction : createAsyncActionFunc = (types, promiseCreator, handler) => (...args ) => {
  return {
    types,
    promise: promiseCreator(...args),
    handler,
  }
}