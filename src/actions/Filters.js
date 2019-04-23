import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export const filtersActions = {
    getContexts,
    getDimentions,
    getFilters,
};

function getContexts() {
    return dispatch => {
        return filtersService.getContextsList().then((data)=> {
            return dispatch({type: filtersConstants.GET_CONTEXTS_LIST, data});
        });
    }
}

function getDimentions(ids) {
    return dispatch => {
        return filtersService.getDimentionsList(ids).then((data)=> {
            return dispatch({type: filtersConstants.GET_DIMENTIONS_LIST, data});
        });
    }
}

function getFilters(ids) {
    return dispatch => {
        return filtersService.getFiltersList(ids).then((data)=> {
            return dispatch({type: filtersConstants.GET_FILTERS_LIST, data});
        });
    }
}