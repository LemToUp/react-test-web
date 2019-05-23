import {all} from 'redux-saga/effects';
import {contextsWatcherSaga, filterDimentionsWatcherSaga, filterFiltersWatcherSaga} from './ApiSaga';

export default function* rootSaga() {
    yield all([
        contextsWatcherSaga(),
        filterDimentionsWatcherSaga(),
        filterFiltersWatcherSaga(),
    ]);
}