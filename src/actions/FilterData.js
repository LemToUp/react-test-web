"use strict";
exports.__esModule = true;
var FilterData_1 = require("../constants/FilterData");
var initFilterSection = function (name) { return ({ type: FilterData_1.filterDataConstants.INIT_FILTER_SECTION, name: name }); };
var setContextsDataByFilter = function (name, data) { return ({ type: FilterData_1.filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER, name: name, data: data }); };
var setContextsChecksByFilter = function (name, data) { return ({ type: FilterData_1.filterDataConstants.SET_CONTEXTS_CHECKS_BY_FILTER, name: name, data: data }); };
var setDimentionsDataByFilter = function (name, data) { return ({ type: FilterData_1.filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, name: name, data: data }); };
var setDimentionsChecksByFilter = function (name, data) { return ({ type: FilterData_1.filterDataConstants.SET_DIMENTIONS_CHECKS_BY_FILTER, name: name, data: data }); };
var setFiltersDataByFilter = function (name, data) { return ({ type: FilterData_1.filterDataConstants.SET_FILTERS_LIST_BY_FILTER, name: name, data: data }); };
var setFiltersChecksByFilter = function (name, data) { return ({ type: FilterData_1.filterDataConstants.SET_FILTERS_CHECKS_BY_FILTER, name: name, data: data }); };
var setSortRulesByFilter = function (name, data) { return ({ type: FilterData_1.filterDataConstants.SET_SORT_RULES_BY_FILTER, name: name, data: data }); };
exports.filtersDataActions = {
    initFilterSection: initFilterSection,
    setContextsDataByFilter: setContextsDataByFilter,
    setContextsChecksByFilter: setContextsChecksByFilter,
    setDimentionsDataByFilter: setDimentionsDataByFilter,
    setDimentionsChecksByFilter: setDimentionsChecksByFilter,
    setFiltersDataByFilter: setFiltersDataByFilter,
    setFiltersChecksByFilter: setFiltersChecksByFilter,
    setSortRulesByFilter: setSortRulesByFilter
};
