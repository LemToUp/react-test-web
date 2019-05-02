import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';
import SearchFilterSection from './SearchFilterSection';

const store = configureStore();

it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <SearchFilterSection
                    //onSendData={onGetSortRules}
                    sortData={[]}
                    //className="col-md-10 offset-md-2 p-2"
                />
            </Provider>
            , div);
        ReactDOM.unmountComponentAtNode(div);
});
