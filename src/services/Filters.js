export const filtersService = {
    getContextsList,
    getDimentionsList,
    getFiltersList,
};

function getContextsList() {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import ('../data/contexts'));
        }, 200);
    }).then((data) => { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
        return data.default;
    });
}

function getDimentionsList(ids) {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import ('../data/categories'));
        }, 200);
    }).then((data) => { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
        return data.default.filter(value => ids.indexOf(value.section_id) !== -1);
    });
}

function getFiltersList(ids) {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import ('../data/filters'));
        }, 200);
    }).then((data) => { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
        return data.default.filter(value => ids.indexOf(value.category_id) !== -1);
    });
}


