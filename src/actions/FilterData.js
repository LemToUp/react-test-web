import {filterDataConstants} from '../constants/FilterData';

export const filtersDataActions = {
    initFilterSection,
    getContextsDataByFilter,
    getContextsChecksByFilter,
    setContextsDataByFilter,
    setContextsChecksByFilter,
    getDimentionsDataByFilter,
    getDimentionsChecksByFilter,
    setDimentionsDataByFilter,
    setDimentionsChecksByFilter,
    getFiltersDataByFilter,
    getFiltersChecksByFilter,
    setFiltersDataByFilter,
    setFiltersChecksByFilter,
};

function initFilterSection(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.INIT_FILTER_SECTION, name});
    }
}

function getContextsDataByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_CONTEXTS_LIST_BY_FILTER, name});
    }
}

function getContextsChecksByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_CONTEXTS_CHECKS_BY_FILTER, name});
    }
}

function setContextsDataByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER, name, data});
    }
}

function setContextsChecksByFilter(name, checks) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_CONTEXTS_CHECKS_BY_FILTER, name, checks});
    }
}

function getDimentionsDataByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_DIMENTIONS_LIST_BY_FILTER, name});
    };
}

function getDimentionsChecksByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_DIMENTIONS_LIST_BY_FILTER, name});
    };
}

function setDimentionsDataByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, name, data});
    };
}

function setDimentionsChecksByFilter(name, checks) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, name, checks});
    };
}

function getFiltersDataByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_FILTERS_LIST_BY_FILTER, name});
    };
}

function getFiltersChecksByFilter(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.GET_FILTERS_LIST_BY_FILTER, name});
    };
}

function setFiltersDataByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER, name, data});
    };
}

function setFiltersChecksByFilter(name, checks) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER, name, checks});
    };
}