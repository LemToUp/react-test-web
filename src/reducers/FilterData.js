import { filterDataConstants } from '../constants/FilterData';

export function filterData(state = {}, action) {
    switch (action.type) {
        case filterDataConstants.INIT_FILTER_SECTION:
            state[action.name] = state[action.name] ? state[action.name] : {};
            return Object.assign({}, state);
        case filterDataConstants.GET_CONTEXTS_LIST_BY_FILTER:
            return state[action.name].filterContexts ? Object.assign({}, state[action.name].filterContexts) : [];
        case filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER:
            state[action.name] = Object.assign(state[action.name], {filterContexts: action.data});
            return Object.assign({}, state);
        case filterDataConstants.GET_DIMENTIONS_LIST_BY_FILTER:
            return state[action.name].filterDimentions ? Object.assign({}, state[action.name].filterDimentions) : [];
        case filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER:
            state[action.name] = Object.assign(state[action.name], {filterDimentions: action.data});
            return Object.assign({}, state);
        case filterDataConstants.GET_FILTERS_LIST_BY_FILTER:
            return state[action.name].filterFilters ? Object.assign({}, state[action.name].filterFilters) : [];
        case filterDataConstants.SET_FILTERS_LIST_BY_FILTER:
            state[action.name] = Object.assign(state[action.name], {filterFilters: action.data});
            return Object.assign({}, state);
        default:
            return state;
    }
}