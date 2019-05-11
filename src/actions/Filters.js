import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export const filtersActions = {
    getContexts,
    getDimentions,
    getFilters,
};

function getContexts() {
    return {type: filtersConstants.CONTEXTS_LIST_REQUESTED}
    /*return dispatch => {
        return filtersService.getContextsList().then((data)=> {
            return dispatch({type: filtersConstants.GET_CONTEXTS_LIST, data});
        });
    }*/
}

function setContexts() {
    return {type: filtersConstants.GET_CONTEXTS_LIST}
    /*return dispatch => {
        return filtersService.getContextsList().then((data)=> {
            return dispatch({type: filtersConstants.GET_CONTEXTS_LIST, data});
        });
    }*/
}

function getDimentions(ids) {
    return dispatch => {
        return filtersService.getDimentionsList(ids).then((data)=> {
            return dispatch({type: filtersConstants.GET_DIMENTIONS_LIST, data});
        });
    }
}

function getFilters(ids, filters) {
    return dispatch => {
        return filtersService.getFiltersList(ids, filters).then((data)=> {
            return dispatch({type: filtersConstants.GET_FILTERS_LIST, data});
        });
    }
}