export const filtersService = {
    getFilterNamesList,
};

function getFilterNamesList() {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import ('../data/tables'));
        }, 200);
    });
}


