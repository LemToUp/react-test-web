import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export const filtersActions = {
    getContexts,
};

function getContexts() {
    return dispatch => {
        filtersService.getContextsList().then(data => {
            dispatch({type: filtersConstants.GET_CONTEXTS_LIST, data});
        });
    }
}