"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/Filter.scss");
var DropDownFilterSection_1 = require("./DropDownFilterSection");
var SearchFilterSection_1 = require("./SearchFilterSection");
var ContentFilterSection_1 = require("./ContentFilterSection");
var react_redux_1 = require("react-redux");
var FilterData_1 = require("../actions/FilterData");
var Draggable_1 = require("../hooks/Draggable");
exports.dataTypes = {
    CONTEXT: 'CONTEXTS',
    DIMENTIONS: 'DIMENTIONS',
    FILTERS: 'FILTERS',
    SORT: 'SORT'
};
function Filter(props) {
    var onClose = function (e) {
        if (props.closeEvent) {
            props.closeEvent(e);
        }
    };
    var _a = react_1.useState(false), isContextListDisplaying = _a[0], setIsContextListDisplaying = _a[1];
    var _b = react_1.useState(false), isDimentionsListDisplaying = _b[0], setIsDimentionsListDisplaying = _b[1];
    var _c = Draggable_1.useDraggable(props.initialPosition, 20), styles = _c[0], catchEvent = _c[1];
    react_1.useEffect(function () {
        storeFilterData(exports.dataTypes.CONTEXT, props.contexts);
    }, []);
    var closeAllLists = function () {
        setIsContextListDisplaying(false);
        setIsDimentionsListDisplaying(false);
    };
    var onToggleContexts = function () {
        if (!isContextListDisplaying) {
            closeAllLists();
        }
        else {
            storeFilterData(exports.dataTypes.DIMENTIONS, props.filterContextsChecks);
            setIsDimentionsListDisplaying(true);
        }
        setIsContextListDisplaying(!isContextListDisplaying);
    };
    var onToggleDimentions = function () {
        if (!isDimentionsListDisplaying) {
            closeAllLists();
        }
        else {
            storeFilterData(exports.dataTypes.FILTERS, props.filterDimentionsChecks);
        }
        setIsDimentionsListDisplaying(!isDimentionsListDisplaying);
    };
    var onGetContexts = function (ids) {
        storeCheckedData(exports.dataTypes.CONTEXT, ids);
    };
    var onGetDimentions = function (ids) {
        storeCheckedData(exports.dataTypes.DIMENTIONS, ids);
    };
    var onGetFilters = function (ids) {
        storeCheckedData(exports.dataTypes.FILTERS, ids);
    };
    var onGetSortRules = function (filters) {
        storeCheckedData(exports.dataTypes.SORT, filters);
    };
    var sendFiltersListToWidget = function (filters, checks) {
        if (props.onGetData && filters && checks) {
            var checkedFilters = filters.filter((function (filter) { return checks.indexOf(filter.id) !== -1; })).map(function (filter) { return filter.name; });
            props.onGetData(checkedFilters);
        }
    };
    var storeCheckedData = function (type, data) {
        var filtersChecks = props.filterFiltersChecks;
        switch (type) {
            case exports.dataTypes.CONTEXT:
                if (props.setContextsChecks) {
                    props.setContextsChecks(data);
                }
                break;
            case exports.dataTypes.DIMENTIONS:
                if (props.setDimentionsChecks) {
                    props.setDimentionsChecks(data);
                }
                break;
            case exports.dataTypes.FILTERS:
                if (props.setFiltersChecks) {
                    props.setFiltersChecks(data);
                }
                filtersChecks = data;
                break;
            case exports.dataTypes.SORT:
                if (props.setSortRules) {
                    props.setSortRules(data);
                }
                break;
            default:
        }
        var dimentions = calculateFilteredDimentions(props.filterDimentions, props.filterContextsChecks);
        var filters = calculateFilteredFilters(props.filterFilters, dimentions, props.filterDimentionsChecks);
        sendFiltersListToWidget(filters, filtersChecks);
    };
    var storeFilterData = function (type, data) {
        switch (type) {
            case exports.dataTypes.CONTEXT:
                if (props.setContexts) {
                    props.setContexts(data);
                }
                break;
            case exports.dataTypes.DIMENTIONS:
                if (props.setDimentions) {
                    props.setDimentions(data);
                }
                break;
            case exports.dataTypes.FILTERS:
                if (props.setFilters) {
                    props.setFilters(data);
                }
                break;
            default:
        }
    };
    var calculateFilteredDimentions = function (dimentions, contextsChecks) {
        if (dimentions === void 0) { dimentions = []; }
        if (contextsChecks === void 0) { contextsChecks = []; }
        return dimentions.filter(function (dimention) {
            return contextsChecks.indexOf(dimention.section_id) !== -1;
        });
    };
    var calculateFilteredFilters = function (filters, dimentions, dimentionsChecks) {
        if (filters === void 0) { filters = []; }
        if (dimentions === void 0) { dimentions = []; }
        if (dimentionsChecks === void 0) { dimentionsChecks = []; }
        dimentionsChecks = dimentions
            .map(function (dimention) { return dimention.id; })
            .filter(function (id) { return dimentionsChecks.indexOf(id) !== -1; });
        filters = filters.filter(function (filter) {
            return dimentionsChecks.indexOf(filter.category_id) !== -1;
        });
        return filters;
    };
    var filteredDimentions = calculateFilteredDimentions(props.filterDimentions, props.filterContextsChecks);
    var filteredFilters = calculateFilteredFilters(props.filterFilters, filteredDimentions, props.filterDimentionsChecks);
    return (react_1["default"].createElement("div", { className: "Filter-modal-wrapper" },
        react_1["default"].createElement("div", { className: "Filter-modal container", style: styles },
            react_1["default"].createElement("div", { className: "Filter-modal-header row p-1" },
                react_1["default"].createElement("div", { className: "col-2 px-1 pt-1" },
                    react_1["default"].createElement("i", { className: "material-icons draggable", onMouseDown: catchEvent }, "drag_indicator")),
                react_1["default"].createElement("span", { className: "col-8" }, "FILTERS"),
                react_1["default"].createElement("span", { className: "Filter-close-icon col-2 pt-1 text-right" },
                    react_1["default"].createElement("i", { className: "material-icons pointer", onClick: onClose }, "close"))),
            react_1["default"].createElement("div", { className: "Filter-modal-body row align-items-end" },
                react_1["default"].createElement(DropDownFilterSection_1["default"], { title: "CONTEXTS", name: props.name + "_contexts", onToggleList: onToggleContexts, onSendCheckedData: onGetContexts, data: props.filterContexts, isDisplaying: isContextListDisplaying, checks: props.filterContextsChecks, className: "col-md-10 offset-md-2 p-1" }),
                react_1["default"].createElement(DropDownFilterSection_1["default"], { title: "DIMENTIONS", name: props.name + "_dimentions", onToggleList: onToggleDimentions, onSendCheckedData: onGetDimentions, data: filteredDimentions, isDisplaying: isDimentionsListDisplaying, checks: props.filterDimentionsChecks, className: "col-md-10 offset-md-2 p-1" }),
                react_1["default"].createElement(SearchFilterSection_1["default"], { onSendData: onGetSortRules, sortData: props.sortRules, className: "col-md-10 offset-md-2 p-2" }),
                react_1["default"].createElement(ContentFilterSection_1["default"], { data: filteredFilters, name: props.name + "_filters", onSendCheckedData: onGetFilters, checks: props.filterFiltersChecks, className: "col-md-10 offset-md-2 p-1" })))));
}
exports.Filter = Filter;
var mapStateToProps = function (state, ownProps) {
    var contexts = state.filters.contexts;
    var _a = state.filterData[ownProps.name], filterContexts = _a.filterContexts, filterContextsChecks = _a.filterContextsChecks, filterDimentions = _a.filterDimentions, filterDimentionsChecks = _a.filterDimentionsChecks, filterFilters = _a.filterFilters, filterFiltersChecks = _a.filterFiltersChecks, sortRules = _a.sortRules;
    return {
        contexts: contexts,
        filterContexts: filterContexts,
        filterContextsChecks: filterContextsChecks,
        filterDimentions: filterDimentions,
        filterDimentionsChecks: filterDimentionsChecks,
        filterFilters: filterFilters,
        filterFiltersChecks: filterFiltersChecks,
        sortRules: sortRules
    };
};
function mapDispatchToProps(dispatch, ownProps) {
    return {
        setContexts: function (data) { return dispatch(FilterData_1.filtersDataActions.setContextsDataByFilter(ownProps.name, data)); },
        setContextsChecks: function (checks) { return dispatch(FilterData_1.filtersDataActions.setContextsChecksByFilter(ownProps.name, checks)); },
        setDimentions: function (data) { return dispatch(FilterData_1.filtersDataActions.setDimentionsDataByFilter(ownProps.name, data)); },
        setDimentionsChecks: function (checks) { return dispatch(FilterData_1.filtersDataActions.setDimentionsChecksByFilter(ownProps.name, checks)); },
        setFilters: function (data) { return dispatch(FilterData_1.filtersDataActions.setFiltersDataByFilter(ownProps.name, data)); },
        setFiltersChecks: function (checks) { return dispatch(FilterData_1.filtersDataActions.setFiltersChecksByFilter(ownProps.name, checks)); },
        setSortRules: function (filters) { return dispatch(FilterData_1.filtersDataActions.setSortRulesByFilter(ownProps.name, filters)); }
    };
}
;
var ConnectedFilter = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Filter);
exports["default"] = ConnectedFilter;
