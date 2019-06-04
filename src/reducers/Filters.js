"use strict";
exports.__esModule = true;
var Filters_1 = require("../constants/Filters");
function filters(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case Filters_1.filtersConstants.CONTEXTS_LIST_SUCCEEDED:
            return Object.assign({}, state, { contexts: action.data });
        case Filters_1.filtersConstants.DIMENTIONS_LIST_SUCCEEDED:
            return Object.assign({}, state, { dimentions: action.data });
        case Filters_1.filtersConstants.FILTERS_LIST_SUCCEEDED:
            return Object.assign({}, state, { filters: action.data });
        default:
            return state;
    }
}
exports.filters = filters;
