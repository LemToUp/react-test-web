export const filtersService = {
    getContextsList,
    getDimentionsList,
    getFiltersList,
};

export {seachFilterConstants} from '../components/SearchFilterSection'

function getContextsList() {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import (`${process.env.REACT_APP_REQUEST_PATH}/contexts`));
        }, 200);
    }).then((data) => { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
        return data.default;
    });
}

function getDimentionsList(ids) {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import (`${process.env.REACT_APP_REQUEST_PATH}/categories`));
        }, 200);
    }).then((data) => { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
        return data.default.filter(value => ids.indexOf(value.section_id) !== -1);
    });
}

function getFiltersList(ids, filters = {}) {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import (`${process.env.REACT_APP_REQUEST_PATH}/filters`));
        }, 200);
    }).then((responce) => { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
        if (ids) {
            let data = responce.default;
            data = data.filter(value => ids.indexOf(value.category_id) !== -1); //Get only required ids

            if (filters.unique) { //Unique names filter (by default)
                let uniqueName = new Set();
                data = data.filter((item) => {
                    if (uniqueName.has(item[filters.unique])) {
                        return false;
                    } else {
                        uniqueName.add(item[filters.unique]);
                        return true;
                    }
                })
            }

            if (filters.searchType && filters.search && filters.search !== '') { //Search word
                let regexp = undefined;
                switch (filters.searchType) {
                    case '**':
                        regexp = new RegExp(`^${filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'g');
                        break;
                    case '*_':
                        regexp = new RegExp(`^${filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
                        break;
                    case '__':
                        regexp = new RegExp(filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                        break;
                    default:
                }
                if (regexp) {
                    data = data.filter((row) => {
                        return row.name.match(regexp);
                    })
                }
            }
            if (filters.sort && filters.sort === 'A-Z') { //Sort by names
                data = data.sort((a, b) => (a.name > b.name) ? 1 : -1);
            }
            return data;
        } else {
            return [];
        }
    });
}


