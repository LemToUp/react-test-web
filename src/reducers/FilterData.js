import { filterDataConstants } from '../constants/FilterData';

export function filterData(state = {}, action) {
    switch (action.type) {
        case filterDataConstants.GET_CONTEXTS_LIST_BY_FILTER:
            return Object.assign({}, state, {contexts: action.data});
        case filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER:
            debugger;
            return Object.assign({}, state, {contexts: action.data});
        case filterDataConstants.GET_DIMENTIONS_LIST_BY_FILTER:
            return Object.assign({}, state, {dimentions: action.data});
        case filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER:
            debugger;
            return Object.assign({}, state, {dimentions: action.data});
        case filterDataConstants.GET_FILTERS_LIST_BY_FILTER:
            return Object.assign({}, state, {filters: action.data});
        case filterDataConstants.SET_FILTERS_LIST_BY_FILTER:
            debugger;
            return Object.assign({}, state, {filters: action.data});
        default:
            return state;
    }
}