"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var logo_svg_1 = require("../logo.svg");
require("bootstrap/dist/css/bootstrap.css");
require("../styles/App.scss");
var WidgetPanel_1 = require("./WidgetPanel");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var panelsCount = 10;
        var panelsRender = Array(panelsCount).fill().map(function (value, index) {
            return react_1["default"].createElement(WidgetPanel_1["default"], { key: "widget_" + index, number: index });
        });
        return (react_1["default"].createElement("div", { className: "App container-fluid" },
            react_1["default"].createElement("header", { className: "App-header row justify-content-center" },
                react_1["default"].createElement("img", { src: logo_svg_1["default"], className: "App-logo", alt: "logo" })),
            react_1["default"].createElement("div", { className: "App-body row" },
                react_1["default"].createElement("div", { className: "col-md-8 offset-md-2" },
                    react_1["default"].createElement("div", { className: "row m-1" }, panelsRender)))));
    };
    return App;
}(react_1.Component));
exports["default"] = App;
