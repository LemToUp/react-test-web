import { call, put, takeEvery} from 'redux-saga/effects'
import { filtersConstants } from '../constants/Filters';
import  { filtersService } from '../services/Filters'

export function* getContextsSaga() {
    yield takeEvery(filtersConstants.GET_CONTEXTS_LIST, fetchContexts);
}

function* fetchContexts() {
    try {
        const data = yield call(filtersService.getContextsList);
        console.log('data', data);
        yield put({type: filtersConstants.CONTEXTS_LIST_SUCCEEDED, data: data});
        console.log('data', data);
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

export function* getDimentionsSaga() {
    yield takeEvery(filtersConstants.CONTEXTS_LIST_REQUESTED, fetchDimentions);
}

function* fetchDimentions(action) {
    try {
        const user = yield call(filtersService.getContextsList, action.payload.userId);
        yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}

export function* getFiltersSaga() {
    yield takeEvery(filtersConstants.GET_FILTERS_LIST, fetchFilters);
}

function* fetchFilters(action) {
    try {
        const user = yield call(filtersService.getContextsList, action.payload.userId);
        yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}