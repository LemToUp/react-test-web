import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedFilter, {Filter} from './Filter';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';

import {filtersActions} from '../actions/Filters';
import {filtersDataActions} from '../actions/FilterData';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const store = configureStore();

const filterName = 'filter_test';
store.dispatch(filtersDataActions.initFilterSection(filterName));

it('renders without crashing', () => {
    return store.dispatch(filtersActions.getContexts()).then(action => {
        expect(action.data.length).toBe(2);

        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedFilter
                    name={`filter_test`}
                />
            </Provider>
            , div);
        ReactDOM.unmountComponentAtNode(div);
        return action;
    });
});


describe('+Module testing of Filter and Redux', () => {
    let store, wrapper;
    configure({adapter: new Adapter()});
    beforeEach(() => {
        store = configureStore();
        store.dispatch(filtersDataActions.initFilterSection(filterName));
    });
    it('++ check Data logic', () => {
        return new Promise(resolve => {
            return resolve(store.dispatch(filtersActions.getContexts()));
        }).then(() => {
            wrapper = mount(
                <Provider store={store}>
                    <ConnectedFilter
                        name={`filter_test`}
                    />
                </Provider>);
            const filter = wrapper.find(Filter);
            expect(filter.prop('contexts').length).toEqual(2);
            filter.prop('setContextsChecks')([2]);
            filter.update();

            /*wrapper.find(Filter).prop('getDimentionsFromState')([1,2]).then(action => {
                filter.prop('setDimentions')(action.data);
                return action;
            });*/
        });
    });
});
