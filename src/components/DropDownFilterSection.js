"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/DropDownFilterSection.scss");
var ChecksInputHandler_1 = require("../hooks/ChecksInputHandler");
function DropDownFilterSection(props) {
    var key = props.key || 'id';
    var value = props.value || 'name';
    var _a = ChecksInputHandler_1.useChecksInputHandler(props), changeData = _a[0], checkedDataString = _a[1];
    var uniqueName = react_1.useState((props.name || "unique_" + Math.random()))[0];
    var toggleDropDown = function (e) {
        e.stopPropagation();
        if (props.isDisplaying && props.onSendCheckedData) {
            props.onSendCheckedData(props.checks);
        }
        if (props.onToggleList) {
            props.onToggleList();
        }
    };
    var hasDataValue = function (value) {
        return props.checks.indexOf(value) !== -1;
    };
    var onChangeData = function (e) {
        changeData(props, e);
    };
    var renderList = function (data) {
        if (Array.isArray(data) && data.length > 0) {
            return react_1["default"].createElement("ul", { className: "list-group pr-5" }, data.map(function (item) { return (react_1["default"].createElement("li", { className: "p-1", key: "li_" + uniqueName + "_" + item.id },
                react_1["default"].createElement("div", { className: "form-check" },
                    react_1["default"].createElement("input", { className: "form-check-input", type: "checkbox", id: uniqueName + "_" + item.id, value: item[key], name: item[key], checked: hasDataValue(item[key]), onChange: onChangeData }),
                    react_1["default"].createElement("label", { className: "form-check-label", htmlFor: uniqueName + "_" + item.id, key: "label_" + uniqueName + "_" + item.id }, item[value])))); }));
        }
    };
    return (react_1["default"].createElement("div", { className: "Filter-section Drop-down-section " + (props.className || '') },
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("i", { className: "material-icons pointer p-1 toggle_" + props.title, onClick: toggleDropDown }, props.isDisplaying ? 'expand_less' : 'expand_more'),
            react_1["default"].createElement("span", { className: "Drop-down-section-title mr-2" }, props.title),
            react_1["default"].createElement("span", { className: "Drop-down-section-row" }, checkedDataString)),
        react_1["default"].createElement("div", { className: "Drop-down-modal " + (!props.isDisplaying ? 'd-none' : '') }, renderList(props.data))));
}
exports["default"] = DropDownFilterSection;
