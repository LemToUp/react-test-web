import { filtersConstants } from '../constants/Filters';

export function filters(state = {}, action) {
    switch (action.type) {
        case filtersConstants.GET_CONTEXTS_LIST:
            return {contexts: action.data};
        default:
            return state;
    }
}