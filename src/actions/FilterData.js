import {filterDataConstants} from '../constants/FilterData';

export const filtersDataActions = {
    initFilterSection,
    setContextsDataByFilter,
    setContextsChecksByFilter,
    setDimentionsDataByFilter,
    setDimentionsChecksByFilter,
    setFiltersDataByFilter,
    setFiltersChecksByFilter,
    setSortRulesByFilter,
};

function initFilterSection(name) {
    return dispatch => {
        return dispatch({type: filterDataConstants.INIT_FILTER_SECTION, name});
    }
}

function setContextsDataByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER, name, data});
    }
}

function setContextsChecksByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_CONTEXTS_CHECKS_BY_FILTER, name, data});
    }
}

function setDimentionsDataByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, name, data});
    };
}

function setDimentionsChecksByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_DIMENTIONS_CHECKS_BY_FILTER, name, data});
    };
}

function setFiltersDataByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER, name, data});
    };
}

function setFiltersChecksByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_FILTERS_CHECKS_BY_FILTER, name, data});
    };
}

function setSortRulesByFilter(name, data) {
    return dispatch => {
        return dispatch({type: filterDataConstants.SET_SORT_RULES_BY_FILTER, name, data});
    };
}