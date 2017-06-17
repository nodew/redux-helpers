"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function asyncMiddleware() {
    return ({ dispatch, getState }) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }
            const { promise, types } = action, rest = __rest(action, ["promise", "types"]);
            if (!promise) {
                return next(action);
            }
            const [REQUEST, SUCCESS, FAILURE] = types;
            next(Object.assign({}, rest, { type: REQUEST }));
            promise.then((result) => next(Object.assign({}, rest, { payload: result, type: SUCCESS })), (error) => next(Object.assign({}, rest, { error, type: FAILURE }))).catch((error) => {
                console.error('MIDDLEWARE ERROR:', error);
                next(Object.assign({}, rest, { error, type: FAILURE }));
            });
            return promise;
        };
    };
}
exports.default = asyncMiddleware;
