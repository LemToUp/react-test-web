export const filtersService = {
    getContextsList,
};

function getContextsList() {
    return new Promise(resolve => {
        return setTimeout(() => {
            return resolve(import ('../data/contexts'));
        }, 200);
    });
}


