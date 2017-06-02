'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createType = exports.createType = function createType(type, namespace) {
  if (typeof type === 'string') {
    return namespace ? namespace + '_' + type : type;
  }
  throw new Error('type should be a string');
};

var joinMethod = function joinMethod(obj, type, namespace) {
  var actionType = createType(type, namespace);
  obj[actionType] = actionType;
  return obj;
};

var createTypes = exports.createTypes = function createTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var join = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : joinMethod;

  if (Array.isArray(types)) {
    return types.reduce(function (acc, type) {
      if (typeof type === 'string') {
        return join(acc, type, namespace);
      }
      throw new Error('types should be [string]');
    }, {});
  }

  throw new Error('types should be [string]');
};

var createAsyncType = exports.createAsyncType = function createAsyncType(type) {
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return createTypes([type, type + '_SUCCESS', type + '_FAIL'], namespace);
};

var asyncJoinMethod = function asyncJoinMethod(obj, type, namespace) {
  return Object.assign({}, obj, _extends({}, createAsyncType(type, namespace)));
};

var createAsyncTypes = exports.createAsyncTypes = function createAsyncTypes() {
  var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return createTypes(types, namespace, asyncJoinMethod);
};