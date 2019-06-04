"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./index.css");
var App_1 = require("./components/App");
var react_redux_1 = require("react-redux");
var ConfigureStore_1 = require("./store/ConfigureStore");
var serviceWorker = require("./serviceWorker");
require("./styles/common.scss");
var Filters_1 = require("./actions/Filters");
var store = ConfigureStore_1["default"]();
store.dispatch(Filters_1.filtersActions.getContexts());
react_dom_1["default"].render(react_1["default"].createElement(react_redux_1.Provider, { store: store },
    react_1["default"].createElement(App_1["default"], null)), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
