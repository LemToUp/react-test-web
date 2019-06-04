"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../styles/ContentFilterSection.scss");
var ChecksInputHandler_1 = require("../hooks/ChecksInputHandler");
function ContentFilterSection(props) {
    var key = props.key || 'id';
    var value = props.value || 'name';
    var className = props.className || '';
    var changeData = ChecksInputHandler_1.useChecksInputHandler(props)[0];
    var uniqueName = react_1.useState((props.name || "unique_" + Math.random()))[0];
    var onChangeData = function (e) {
        changeData(props, e);
    };
    var hasDataValue = function (value) {
        return props.checks.indexOf(value) !== -1;
    };
    var renderList = function (data) {
        if (Array.isArray(data) && data.length > 0) {
            return react_1["default"].createElement("ul", { className: "list-group" }, data.map(function (item) { return (react_1["default"].createElement("li", { key: "li_" + uniqueName + "_" + item.id },
                react_1["default"].createElement("div", { className: "checkbox" },
                    react_1["default"].createElement("label", { htmlFor: uniqueName + "_" + item.id, className: "pointer" },
                        react_1["default"].createElement("input", { type: "checkbox", id: uniqueName + "_" + item.id, value: item[key], name: item[key], checked: hasDataValue(item[key]), onChange: onChangeData, className: "mx-1" }),
                        item[value])))); }));
        }
    };
    return (react_1["default"].createElement("div", { className: "Filter-section Content-filter-section " + className }, renderList(props.data)));
}
exports["default"] = ContentFilterSection;
