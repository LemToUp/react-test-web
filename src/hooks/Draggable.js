"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useDraggable(defaultStyle, defaultOffset) {
    var _a = react_1.useState({ display: 'none' }), styles = _a[0], setStyles = _a[1];
    var _b = react_1.useState(false), isDraggable = _b[0], setDraggableState = _b[1];
    var offsetParams = react_1.useState(defaultOffset || 0)[0];
    function onMouseDownHandler(e) {
        e.preventDefault();
        if (!isDraggable) {
            setDraggableState(true);
        }
        e.stopPropagation();
    }
    react_1.useEffect(function () {
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        return function cleanup() {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        };
    });
    react_1.useEffect(function () {
        if (defaultStyle) {
            setStyles(Object.assign({ display: 'block' }, defaultStyle));
        }
    }, []);
    var onMouseMove = function (e) {
        if (isDraggable) {
            setStyles({
                top: e.clientY - offsetParams + "px",
                left: e.clientX - offsetParams + "px"
            });
        }
        e.stopPropagation();
    };
    var onMouseUp = function (e) {
        if (isDraggable) {
            setDraggableState(false);
        }
        e.stopPropagation();
    };
    return [styles, onMouseDownHandler];
}
exports.useDraggable = useDraggable;
