'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toCamelCase = exports.toCamelCase = function toCamelCase(str) {
  return str.toLowerCase().replace(/((_|-|\/)\w)/ig, function (s, p1) {
    return p1[1].toUpperCase();
  });
};

var isArray = exports.isArray = function isArray(value) {
  return Array.isArray(value);
};

var isString = exports.isString = function isString(value) {
  return typeof value === 'string';
};

var isObject = exports.isObject = function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
};

var isFunction = exports.isFunction = function isFunction(value) {
  return typeof value === 'function';
};