import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';

import {filtersActions} from '../actions/Filters';
import ContentFilterSection from './ContentFilterSection';

const store = configureStore();

it('renders without crashing', () => {

    return store.dispatch(filtersActions.getFilters([1, 2, 3, 4])).then(action => {

        expect(action.data.length).toBe(8);

        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <ContentFilterSection
                    data={action.data}
                    //onSendCheckedData={onGetFilters}
                    checks={[]}
                    className="col-md-10 offset-md-2 p-1"
                />
            </Provider>
            , div);
        ReactDOM.unmountComponentAtNode(div);

        return action;
    });
});
