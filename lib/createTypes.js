"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypes = (n = 1) => {
    const types = [];
    for (let i = 0; i < n; i++) {
        types.push(Symbol());
    }
    return types;
};
