import {filterDataConstants} from '../constants/FilterData';

const initFilterSection = (name) => ({type: filterDataConstants.INIT_FILTER_SECTION, name});

const setContextsDataByFilter = (name, data) => ({type: filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER, name, data});
const setContextsChecksByFilter = (name, data) => ({type: filterDataConstants.SET_CONTEXTS_CHECKS_BY_FILTER, name, data});

const setDimentionsDataByFilter = (name, data) => ({type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, name, data});
const setDimentionsChecksByFilter = (name, data) => ({type: filterDataConstants.SET_DIMENTIONS_CHECKS_BY_FILTER, name, data});

const setFiltersDataByFilter = (name, data) => ({type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER, name, data});
const setFiltersChecksByFilter = (name, data) => ({type: filterDataConstants.SET_FILTERS_CHECKS_BY_FILTER, name, data});

const setSortRulesByFilter = (name, data) => ({type: filterDataConstants.SET_SORT_RULES_BY_FILTER, name, data});

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