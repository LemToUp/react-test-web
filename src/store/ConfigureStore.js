import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/RootSaga';
import {filters} from '../reducers/Filters';
import {filterData} from '../reducers/FilterData';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        combineReducers({
            filters,
            filterData,
        }),
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}