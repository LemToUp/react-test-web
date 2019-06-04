"use strict";
exports.__esModule = true;
var Filters_1 = require("../constants/Filters");
var getContexts = function () { return ({ type: Filters_1.filtersConstants.GET_CONTEXTS_LIST }); };
exports.filtersActions = {
    getContexts: getContexts
};
