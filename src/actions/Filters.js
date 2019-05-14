import {filtersConstants} from '../constants/Filters';

const getContexts = () => ({type: filtersConstants.GET_CONTEXTS_LIST});

export const filtersActions = {
    getContexts,
};