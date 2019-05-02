import { filtersConstants } from '../constants/Filters';

export function filters(state = {}, action) {
    switch (action.type) {
        case filtersConstants.GET_CONTEXTS_LIST:
            return Object.assign({}, state, {contexts: action.data});
        case filtersConstants.GET_DIMENTIONS_LIST:
            return Object.assign({}, state, {dimentions: action.data});
        case filtersConstants.GET_FILTERS_LIST:
            return Object.assign({}, state, {filters: action.data});
        default:
            return state;
    }
}