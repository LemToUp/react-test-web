import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export const filtersActions = {
    getFiltersNames,
};

function getFiltersNames() {
    return dispatch => {
        filtersService.getFilterNamesList().then(data => {
            dispatch({type: filtersConstants.GET_TABLE_NAMES_LIST, data});
        });
    }
}