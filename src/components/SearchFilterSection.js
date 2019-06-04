"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
require("../styles/SearchFilterSection.scss");
var Filters_1 = require("../constants/Filters");
var defaultSortDataValue = {
    searchType: Filters_1.seachFilterConstants.SEARCH_FILTER_COMPARE_FULL,
    search: null,
    sort: null,
    unique: 'name'
};
function DropDownFilterSection(props) {
    var _a = react_1.useState(false), isShowPopup = _a[0], setIsShowPopup = _a[1];
    var _b = react_1.useState(''), searchPhrase = _b[0], setSearchPhrase = _b[1];
    var _c = react_1.useState(false), forceUpdateVariable = _c[0], forceUpdate = _c[1];
    react_1.useEffect(function () {
        if (props.onSendData) {
            props.onSendData(Object.assign(defaultSortDataValue, props.sortData, { search: '' }));
        }
    }, []);
    var toggleIsShowPopup = function (e) {
        e.stopPropagation();
        setIsShowPopup(!isShowPopup);
    };
    var changeCurrentFilter = function (filterName, e) {
        e.stopPropagation();
        sendFiltersToParent({ searchType: filterName });
        setIsShowPopup(!isShowPopup);
    };
    var onToggleCompareFullFilter = function (e) {
        changeCurrentFilter(Filters_1.seachFilterConstants.SEARCH_FILTER_COMPARE_FULL, e);
    };
    var onToggleCompareParticalFilter = function (e) {
        changeCurrentFilter(Filters_1.seachFilterConstants.SEARCH_FILTER_COMPARE_PARTICAL, e);
    };
    var onToggleBegginingFromFilter = function (e) {
        changeCurrentFilter(Filters_1.seachFilterConstants.SEARCH_FILTER_COMPARE_BEGINNING_FROM, e);
    };
    var sendFiltersToParent = function (filters) {
        if (props.onSendData && props.sortData) {
            props.onSendData(__assign({}, props.sortData, filters));
        }
    };
    var onChangeSearchPhrase = function (e) {
        e.stopPropagation();
        setSearchPhrase(e.target.value);
    };
    var onOrderToggle = function (e) {
        e.stopPropagation();
        sendFiltersToParent({ sort: props.sortData.sort ? undefined : Filters_1.orderFilterConstants.ORDER_FILTER_ALPHABETICAL_UP });
        forceUpdate(!forceUpdateVariable);
    };
    var onSendSearchPhrase = function (e) {
        e.stopPropagation();
        sendFiltersToParent({ search: searchPhrase });
    };
    var onInputKeyUp = function (e) {
        e.stopPropagation();
        if (e.key === 'Enter') {
            sendFiltersToParent({ search: searchPhrase });
        }
    };
    return (react_1["default"].createElement("div", { className: "Filter-section Search-filter-section " + (props.className || '') },
        react_1["default"].createElement("div", { className: "input-group mb-1" },
            react_1["default"].createElement("div", { className: "input-group-prepend" },
                react_1["default"].createElement("span", { className: "input-group-text p-1" },
                    react_1["default"].createElement("i", { className: "material-icons pointer", onClick: onSendSearchPhrase }, "search"))),
            react_1["default"].createElement("input", { type: "text", className: "form-control p-1", onChange: onChangeSearchPhrase, onKeyPress: onInputKeyUp })),
        react_1["default"].createElement("div", { className: "btn-group btn-group-sm", role: "group", "aria-label": "..." },
            react_1["default"].createElement("button", { type: "button", className: "btn btn-secondary " + ((props.sortData && props.sortData.sort) ? 'active' : ''), onClick: onOrderToggle }, Filters_1.orderFilterConstants.ORDER_FILTER_ALPHABETICAL_UP),
            react_1["default"].createElement("div", { className: "btn-group btn-group-sm", role: "group" },
                react_1["default"].createElement("button", { type: "button", className: "btn btn-secondary", onClick: toggleIsShowPopup }, props.sortData ? props.sortData.searchType : ''),
                react_1["default"].createElement("div", { className: "dropdown-menu mt-0", "aria-labelledby": "btnGroupDrop1", style: { display: isShowPopup ? 'block' : 'none' } },
                    react_1["default"].createElement("button", { className: "dropdown-item py-1 px-2", onClick: onToggleCompareFullFilter }, Filters_1.seachFilterConstants.SEARCH_FILTER_COMPARE_FULL),
                    react_1["default"].createElement("button", { className: "dropdown-item py-1 px-2", onClick: onToggleCompareParticalFilter }, Filters_1.seachFilterConstants.SEARCH_FILTER_COMPARE_PARTICAL),
                    react_1["default"].createElement("button", { className: "dropdown-item py-1 px-2", onClick: onToggleBegginingFromFilter }, Filters_1.seachFilterConstants.SEARCH_FILTER_COMPARE_BEGINNING_FROM))))));
}
exports["default"] = DropDownFilterSection;
