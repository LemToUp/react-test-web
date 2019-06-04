"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
function useChecksInputHandler(props) {
    react_1.useEffect(function () {
        if (!props.checks && props.onSendCheckedData) {
            props.onSendCheckedData([]);
        }
    }, []);
    var changeData = function (props, e) {
        var checks = props.checks ? props.checks.slice() : [];
        var target = react_dom_1["default"].findDOMNode(e.target);
        if (target) {
            if (target.checked) {
                checks.push(Number.parseInt(e.target.value)); //Event transform value to a string
                e.target.checked = true; //Toggle input
            }
            else {
                var index = checks.indexOf(Number.parseInt(e.target.value));
                if (index !== -1) {
                    checks.splice(index, 1); //Remove if founded
                }
                e.target.checked = false; //Toggle input
            }
        }
        if (props.onSendCheckedData) {
            props.onSendCheckedData(checks);
        }
        e.stopPropagation();
    };
    var checkedDataString = react_1.useMemo(function () {
        return props.data ? props.data
            .filter(function (value) { return props.checks.indexOf(value.id) !== -1; })
            .map(function (value) { return value.name; })
            .join(', ') : '';
    }, [props.data, props.checks]);
    return [changeData, checkedDataString];
}
exports.useChecksInputHandler = useChecksInputHandler;
