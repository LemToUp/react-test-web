import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export const filtersActions = {
    getContexts,
};

function getContexts() {
    return dispatch => {
        filtersService.getContextsList().then(({default: data})=> { //https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655
            dispatch({type: filtersConstants.GET_CONTEXTS_LIST, data});
        });
    }
}