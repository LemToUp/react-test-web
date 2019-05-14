import { filtersConstants } from '../constants/Filters';

export function filters(state = {}, action) {
    switch (action.type) {
        case filtersConstants.CONTEXTS_LIST_SUCCEEDED:
            return Object.assign({}, state, {contexts: action.data});

        case filtersConstants.DIMENTIONS_LIST_SUCCEEDED:
            return Object.assign({}, state, {dimentions: action.data});

        case filtersConstants.FILTERS_LIST_SUCCEEDED:
            return Object.assign({}, state, {filters: action.data});

        default:
            return state;
    }
}