import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';

import {filtersActions} from '../actions/Filters';
import {filtersDataActions} from '../actions/FilterData';

const store = configureStore();

store.dispatch(filtersActions.getContexts());
store.dispatch(filtersDataActions.initFilterSection(`filter_test`));

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <Filter
                name={`filter_test`}
            />
        </Provider>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
