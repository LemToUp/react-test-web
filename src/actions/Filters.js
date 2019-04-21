import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export const filtersActions = {
    getContexts,
    getDimentions,
};

function getContexts() {
    return dispatch => {
        filtersService.getContextsList().then((data)=> { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
            dispatch({type: filtersConstants.GET_CONTEXTS_LIST, data});
        });
    }
}

function getDimentions(ids) {
    return dispatch => {
        filtersService.getDimentionsList(ids).then((data)=> { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
            dispatch({type: filtersConstants.GET_DIMENTIONS_LIST, data});
        });
    }
}