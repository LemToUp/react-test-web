"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/WidgetPanel.scss");
var Filter_1 = require("./Filter");
var react_redux_1 = require("react-redux");
var FilterData_1 = require("../actions/FilterData");
function WidgetPanel(props) {
    var _a = react_1.useState(false), isFilterShow = _a[0], toggleFilter = _a[1];
    var _b = react_1.useState(props.list || []), selectedFilters = _b[0], setSelectedFilters = _b[1];
    var _c = react_1.useState(false), forceUpdateVariable = _c[0], forceUpdate = _c[1];
    var _d = react_1.useState({ top: 0, left: 0 }), initialFilterCoordinates = _d[0], updateInitialFilterCoordinates = _d[1];
    react_1.useEffect(function () {
        props.dispatch(FilterData_1.filtersDataActions.initFilterSection("filter_" + props.number)); //Bad decision to create filter section
    }, []);
    var onToggleFilter = function (e) {
        e.stopPropagation();
        e.preventDefault();
        updateInitialFilterCoordinates({
            top: e.clientY + "px",
            left: e.clientX + "px"
        });
        toggleFilter(!isFilterShow);
    };
    var onGetFilters = function (data) {
        setSelectedFilters(data);
        forceUpdate(!forceUpdateVariable);
    };
    var renderList = function (data) {
        if (Array.isArray(data) && data.length > 0) {
            return react_1["default"].createElement("ul", { className: "list-group m-2 p-1" }, data.map(function (filterName, i) { return (react_1["default"].createElement("li", { key: "sected_filters_" + i, className: "widget-row", id: "sected_filters_" + i },
                react_1["default"].createElement("p", { className: "mb-0" }, filterName))); }));
        }
    };
    return (react_1["default"].createElement("section", { className: "Widget-panel col-md-4 mb-1 p-1" },
        react_1["default"].createElement("div", { className: "row row align-items-start" },
            react_1["default"].createElement("div", { className: "Widget-button col-md-4" },
                react_1["default"].createElement("i", { className: "material-icons btn-circle toggle-button", onClick: onToggleFilter }, isFilterShow ? 'format_indent_decrease' : 'format_indent_increase')),
            react_1["default"].createElement("div", { className: "Widget-list col-8" }, renderList(selectedFilters)),
            isFilterShow ?
                react_1["default"].createElement(Filter_1["default"], { closeEvent: onToggleFilter, onGetData: onGetFilters, name: "filter_" + props.number, initialPosition: initialFilterCoordinates }) : null)));
}
function mapStateToProps(state) {
    var filters = state.filters.filters;
    return {
        filters: filters
    };
}
var ConnectedWidgetPanel = react_redux_1.connect(mapStateToProps)(WidgetPanel);
exports["default"] = ConnectedWidgetPanel;
