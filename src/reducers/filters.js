import { filtersConstants } from '../constants/Filters';

export function filters(state = {}, action) {
    switch (action.type) {
        case filtersConstants.GET_TABLE_NAMES_LIST:
            return {filters: action.data};
        default:
            return state;
    }
}