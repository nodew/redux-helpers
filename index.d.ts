declare module "redux-helpers" {
  type promiseCreatorType = (...args: any[]) => Promise<any>;

  type syncAction = {
    type: symbol,
    payload?: any,
  }

  type asyncAction = {
    types: symbol [],
    promise: Promise<any>,
    handler?: (...args : any[]) => Promise<any>
  }

  export function createAction (type: symbol) : ((payload : any) => syncAction)

  export function createAsyncAction (
    types : symbol[],
    promiseCreator : promiseCreatorType,
    handler? : (...args : any[]) => Promise<any>
  ) : ((...args : any[]) => asyncAction)

  export function createTypes (n : number) : symbol []

  export function createReducer (initState : object, updates? : object) : object

  export function createReducers (types: symbol[], initState: object, updates? : object) : object

  export function asyncMiddleware ({ getState, dispatch }) : ((next) => ((action) => any))
}