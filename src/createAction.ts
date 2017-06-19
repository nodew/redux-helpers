type promiseCreatorType = (...args: any[]) => Promise<any>;

interface syncAction {
  type: symbol,
  payload?: any,
}

interface asyncAction {
  types: symbol [],
  promise: Promise<any>,
}

export const createAction = (type : symbol) => (payload : any) : syncAction => {
  return {
    type,
    payload
  }
}

export const createAsyncAction = (types : symbol[], promiseCreator : promiseCreatorType) => (...args : any[]) : asyncAction => {
  return {
    types,
    promise: promiseCreator(...args)
  }
}