'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncReducer = exports.createReducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createAction = require('./createAction');

var _utils = require('./utils');

var updateState = function updateState(updates, state, action) {
  var updateMethods = Object.keys(updates);
  var updateMethod = updateMethods.find(function (m) {
    return m === action.type;
  });
  if (updateMethod) {
    return updateMethod(state, action.payload, action.meta);
  }
  return state;
};

var createReducer = exports.createReducer = function createReducer(initState) {
  var updates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    return updateState(updates, state, action);
  };
};

var createAsyncReducer = exports.createAsyncReducer = function createAsyncReducer(baseType, initState, updates) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    var success = baseType + '_SUCCESS';
    var fail = baseType + '_FAIL';
    switch (action.type) {
      case baseType:
        if (updates[baseType]) {
          return updates[baseType](state, action.payload, action.meta);
        } else {
          return assign({}, state, { loading: true });
        }
      case success:
        if (updates[success]) {
          return updates[success](state, action.payload, action.meta);
        } else {
          return assign({}, state, action.payload, { loading: false });
        }
      case fail:
        if (updates[fail]) {
          return updates[fail](state, action.payload, action.meta);
        } else {
          return assign({}, state, {
            error: _extends({}, action.payload),
            loading: false
          });
        }
      default:
        return updateState(updates, state, action);
    }
  };
};