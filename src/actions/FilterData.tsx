import {filterDataConstants} from '../constants/FilterData';

const initFilterSection = (name:string) => ({type: filterDataConstants.INIT_FILTER_SECTION, name});

const setContextsDataByFilter = (name:string, data:object) => ({type: filterDataConstants.SET_CONTEXTS_LIST_BY_FILTER, name, data});
const setContextsChecksByFilter = (name:string, data:object) => ({type: filterDataConstants.SET_CONTEXTS_CHECKS_BY_FILTER, name, data});

const setDimentionsDataByFilter = (name:string, data:object) => ({type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, name, data});
const setDimentionsChecksByFilter = (name:string, data:object) => ({type: filterDataConstants.SET_DIMENTIONS_CHECKS_BY_FILTER, name, data});

const setFiltersDataByFilter = (name:string, data:object) => ({type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER, name, data});
const setFiltersChecksByFilter = (name:string, data:object) => ({type: filterDataConstants.SET_FILTERS_CHECKS_BY_FILTER, name, data});

const setSortRulesByFilter = (name:string, data:object) => ({type: filterDataConstants.SET_SORT_RULES_BY_FILTER, name, data});

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