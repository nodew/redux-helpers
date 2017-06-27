"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = (type) => (payload) => {
    return {
        type,
        payload
    };
};
exports.createAsyncAction = (types, promiseCreator, handler) => (...args) => {
    return {
        types,
        promise: promiseCreator(...args),
        handler,
    };
};
