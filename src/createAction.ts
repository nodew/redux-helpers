type promiseCreatorType = (...args: any[]) => Promise<any>;

interface action {
  type: symbol | symbol [],
  payload?: any,
  promise?: Promise<any>,
}

export const createAction = (type : symbol) => (payload : any) : action => {
  return {
    type,
    payload
  }
}

export const createAsyncAction = (types : symbol[], promiseCreator : promiseCreatorType) => (...args : any[]) : action => {
  return {
    type: types,
    promise: promiseCreator(...args)
  }
}