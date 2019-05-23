import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';

import {filtersActions} from '../actions/Filters';
import DropDownFilterSection from './DropDownFilterSection';

const store = configureStore();

it('renders without crashing', () => {

    return store.dispatch(filtersActions.getContexts()).then(action => {

        expect(action.data.length).toBe(2);

        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <DropDownFilterSection
                    title="CONTEXTS"
                    data={action.data}
                    isDisplaying={true}
                    checks={[]}
                    className="col-md-10 offset-md-2 p-1"
                />
            </Provider>
            , div);
        ReactDOM.unmountComponentAtNode(div);

        return action;
    });
});
