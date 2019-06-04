"use strict";
exports.__esModule = true;
exports.filtersService = {
    getContextsList: getContextsList,
    getDimentionsList: getDimentionsList,
    getFiltersList: getFiltersList
};
function getContextsList() {
    return new Promise(function (resolve) {
        return setTimeout(function () {
            return resolve(Promise.resolve().then(function () { return require(process.env.REACT_APP_REQUEST_PATH + "/contexts"); }));
        }, 200);
    }).then(function (data) {
        return data["default"];
    });
}
function getDimentionsList(ids) {
    if (ids === void 0) { ids = []; }
    return new Promise(function (resolve) {
        return setTimeout(function () {
            return resolve(Promise.resolve().then(function () { return require(process.env.REACT_APP_REQUEST_PATH + "/categories"); }));
        }, 200);
    }).then(function (data) {
        return (data["default"] && data["default"].length > 0) ? data["default"].filter(function (value) { return ids.indexOf(value.section_id) !== -1; }) : [];
    });
}
function getFiltersList(ids, filters) {
    if (ids === void 0) { ids = []; }
    if (filters === void 0) { filters = {}; }
    return new Promise(function (resolve) {
        return setTimeout(function () {
            return (ids && ids.length > 0) ? resolve(Promise.resolve().then(function () { return require(process.env.REACT_APP_REQUEST_PATH + "/filters"); })) : { "default": [] };
        }, 200);
    }).then(function (responce) {
        if (ids) {
            var data = responce["default"];
            data = data.filter(function (value) { return ids.indexOf(value.category_id) !== -1; }); //Get only required ids
            if (filters.unique) { //Unique names filter (by default)
                var uniqueName_1 = new Set();
                data = data.filter(function (item) {
                    if (uniqueName_1.has(item[filters.unique])) {
                        return false;
                    }
                    else {
                        uniqueName_1.add(item[filters.unique]);
                        return true;
                    }
                });
            }
            if (filters.searchType && filters.search && filters.search !== '') { //Search word
                var regexp_1 = undefined;
                switch (filters.searchType) {
                    case '**':
                        regexp_1 = new RegExp("^" + filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "$", 'g');
                        break;
                    case '*_':
                        regexp_1 = new RegExp("^" + filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                        break;
                    case '__':
                        regexp_1 = new RegExp(filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                        break;
                    default:
                }
                if (regexp_1) {
                    data = data.filter(function (row) {
                        return row.name.match(regexp_1);
                    });
                }
            }
            if (filters.sort && filters.sort === 'A-Z') { //Sort by names
                data = data.sort(function (a, b) { return (a.name > b.name) ? 1 : -1; });
            }
            return data;
        }
        else {
            return [];
        }
    });
}
