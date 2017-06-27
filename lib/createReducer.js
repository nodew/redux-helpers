"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateState = (updates, state, action) => {
    const updateMethod = updates[action.type];
    if (updateMethod) {
        return updateMethod(state, action);
    }
    return state;
};
exports.createReducer = (initState, updates = {}) => {
    return (state = initState, action) => {
        return updateState(updates, state, action);
    };
};
exports.createAsyncReducer = (types, initState = {}, updates) => {
    const [request, success, fail] = types;
    const defaultUpdates = {
        [request]: (state) => {
            return Object.assign({}, state, { pending: true });
        },
        [success]: (state, action) => {
            return Object.assign({}, state, action.payload, { pending: false });
        },
        [fail]: (state, action) => {
            return Object.assign({}, state, { error: action.error, pending: false });
        }
    };
    return exports.createReducer(initState, Object.assign({}, defaultUpdates, updates));
};
