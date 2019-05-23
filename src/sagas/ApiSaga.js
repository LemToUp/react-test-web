import {call, put, takeLatest} from 'redux-saga/effects';
import {filtersConstants} from '../constants/Filters';
import {filterDataConstants} from '../constants/FilterData';
import {filtersService} from '../services/Filters';

export function* contextsWatcherSaga() {
    yield takeLatest(filtersConstants.GET_CONTEXTS_LIST, fetchContexts);
}

function* fetchContexts() {
    try {
        const data = yield call(filtersService.getContextsList);
        yield put({type: filtersConstants.CONTEXTS_LIST_SUCCEEDED, data: data});
    } catch (e) {
        console.error(e);
    }
}

export function* filterDimentionsWatcherSaga() {
    yield takeLatest(filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER, fetchFilterDimentions);
}

function* fetchFilterDimentions(action) {
    try {
        const data = yield call(filtersService.getDimentionsList, action.data);
        yield put({type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER_SUCCEEDED, data: data, name: action.name});
    } catch (e) {
        console.error(e);
    }
}

export function* filterFiltersWatcherSaga() {
    yield takeLatest(filterDataConstants.SET_FILTERS_LIST_BY_FILTER, fetchFilterFilters);
}

function* fetchFilterFilters(action) {
    try {
        const data = yield call(filtersService.getFiltersList, action.data, action.filters);
        yield put({type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER_SUCCEEDED, data: data, name: action.name});
    } catch (e) {
        console.error(e);
    }
}