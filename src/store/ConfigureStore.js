import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import { filters } from '../reducers/Filters'
import { filterData } from '../reducers/FilterData'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            filters,
            filterData,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}