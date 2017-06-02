'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncAction = exports.createActions = exports.createAction = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('./utils');

var createAction = exports.createAction = function createAction(type) {
  return function (payload) {
    return {
      type: type,
      payload: payload
    };
  };
};

var createActionFromObj = function createActionFromObj(obj) {
  var preKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return Object.keys(obj).reduce(function (acc, key) {
    var curKey = preKey ? preKey + '/' + key : key;
    var value = obj[key];
    var name = (0, _utils.toCamelCase)(curKey);
    if ((0, _utils.isFunction)(value)) {
      acc[name] = function () {
        return {
          type: curKey,
          payload: value.apply(undefined, arguments)
        };
      };
    }

    if ((0, _utils.isArray)(value) && value.length === 2) {
      acc[name] = function () {
        return {
          type: curKey,
          payload: value[0].apply(value, arguments),
          meta: value[1].apply(value, arguments)
        };
      };
    }

    if ((0, _utils.isObject)(value)) {
      createActionFromObj(value, curKey, acc);
    }

    return acc;
  }, actions);
};

var createActions = exports.createActions = function createActions() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var actions = {};
  args.forEach(function (arg) {
    if ((0, _utils.isString)(arg)) {
      actions[(0, _utils.toCamelCase)(arg)] = createAction(arg);
    }
    if ((0, _utils.isObject)(arg)) {
      createActionFromObj(arg, '', actions);
    }
  });
  return actions;
};

var createAsyncAction = exports.createAsyncAction = function createAsyncAction(type) {
  return function (action) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return function (dispatch, getState) {
        var p = void 0;
        switch (typeof action === 'undefined' ? 'undefined' : _typeof(action)) {
          case 'function':
            p = action.apply(undefined, args);
            if (typeof p.then !== 'function') {
              throw new Error('action should return a Promise');
            }
            break;
          case 'object':
            if (typeof action.then === 'function') {
              return p = action;
            }
            throw new Error('action should be a Promise');
          default:
            throw new Error("type of action isn't right");
        }

        return p.then(function (payload) {
          return dispatch({
            type: type + '_SUCCESS',
            payload: payload
          });
        }).catch(function (error) {
          return dispatch({
            type: type + '_FAIL',
            payload: error
          });
        });
      };
    };
  };
};