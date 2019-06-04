"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_saga_1 = require("redux-saga");
var RootSaga_1 = require("../sagas/RootSaga");
var Filters_1 = require("../reducers/Filters");
var FilterData_1 = require("../reducers/FilterData");
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
exports["default"] = (function () {
    var sagaMiddleware = redux_saga_1["default"]();
    var store = redux_1.createStore(redux_1.combineReducers({
        filters: Filters_1.filters,
        filterData: FilterData_1.filterData
    }), composeEnhancers(redux_1.applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(RootSaga_1["default"]);
    return store;
});
