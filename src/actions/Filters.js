import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export const filtersActions = {
    getContexts,
    getDimentions,
    getFilters,
};

function getContexts() {
    return dispatch => {
        filtersService.getContextsList().then((data)=> {
            dispatch({type: filtersConstants.GET_CONTEXTS_LIST, data});
        });
    }
}

function getDimentions(ids) {
    return dispatch => {
        filtersService.getDimentionsList(ids).then((data)=> {
            dispatch({type: filtersConstants.GET_DIMENTIONS_LIST, data});
        });
    }
}

function getFilters(ids) {
    return dispatch => {
        filtersService.getFiltersList(ids).then((data)=> {
            dispatch({type: filtersConstants.GET_FILTERS_LIST, data});
        });
    }
}