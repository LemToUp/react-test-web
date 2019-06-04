import { filterDataConstants } from '../constants/FilterData';

export function filterData(state = {}, action: {type:string ,name:string , data:object}) {
    switch (action.type) {
        case filterDataConstants.INIT_FILTER_SECTION:
            state[action.name] = state[action.name] || {};
            return Object.assign({}, state);

        case filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER:
            state[action.name] = Object.assign({}, state[action.name], {filterContexts: action.data});
            return Object.assign({}, state);
        case filterDataConstants.SET_CONTEXTS_CHECKS_BY_FILTER:
            state[action.name] = Object.assign({}, state[action.name], {filterContextsChecks: action.data});
            return Object.assign({}, state);

        case filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER_SUCCEEDED:
            state[action.name] = Object.assign({}, state[action.name], {filterDimentions: action.data});
            return Object.assign({}, state);
        case filterDataConstants.SET_DIMENTIONS_CHECKS_BY_FILTER:
            state[action.name] = Object.assign({}, state[action.name], {filterDimentionsChecks: action.data});
            return Object.assign({}, state);

        case filterDataConstants.SET_FILTERS_LIST_BY_FILTER_SUCCEEDED:
            state[action.name] = Object.assign({}, state[action.name], {filterFilters: action.data});
            return Object.assign({}, state);
        case filterDataConstants.SET_FILTERS_CHECKS_BY_FILTER:
            state[action.name] = Object.assign({}, state[action.name], {filterFiltersChecks: action.data});
            return Object.assign({}, state);

        case filterDataConstants.SET_SORT_RULES_BY_FILTER:
            state[action.name] = Object.assign({}, state[action.name], {sortRules: action.data});
            return Object.assign({}, state);
        default:
            return state;
    }
}