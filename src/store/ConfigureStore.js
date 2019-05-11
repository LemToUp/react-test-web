import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {getContextsSaga} from '../sagas/Api';
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

    sagaMiddleware.run(getContextsSaga);

    return store;
}