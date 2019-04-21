import { filtersConstants } from '../constants/Filters';

export function filters(state = {}, action) {
    switch (action.type) {
        case filtersConstants.GET_CONTEXTS_LIST:
            return {contexts: action.data};
        case filtersConstants.GET_DIMENTIONS_LIST:
            return {dimentions: action.data};
        default:
            return state;
    }
}