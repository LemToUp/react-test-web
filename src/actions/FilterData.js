import {filterDataConstants} from '../constants/FilterData';

export const filtersDataActions = {
    getContextsByFilter,
    setContextsByFilter,
    getDimentionsByFilter,
    setDimentionsByFilter,
    getFiltersByFilter,
    setFiltersByFilter,
};

function getContextsByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_CONTEXTS_LIST_BY_FILTER, name});
    }
}

function setContextsByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER, name, data});
    }
}

function getDimentionsByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_DIMENTIONS_LIST_BY_FILTER, name});
    };
}

function setDimentionsByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, name, data});
    };
}

function getFiltersByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_FILTERS_LIST_BY_FILTER, name});
    };
}

function setFiltersByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER, name, data});
    };
}