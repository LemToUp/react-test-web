import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedFilter from './Filter';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';

import {filtersActions} from '../actions/Filters';
import {filtersDataActions} from '../actions/FilterData';

import {act} from 'react-test-renderer';
import {filterDataConstants} from '../constants/FilterData';

describe('Filter component testing', () => {
    let container, store, component;
    const filterName = 'filter_test';

    beforeEach(() => {
        store = configureStore();
        store.dispatch(filtersActions.getContexts());
        store.dispatch(filtersDataActions.initFilterSection(filterName));

        component = (
            <Provider store={store}>
                <ConnectedFilter
                    name={filterName}
                    onGetData={data => console.log(data)}
                />
            </Provider>
        );

        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        //container = null;
        //store = null;
    });


    it('renders without crashing', () => {
        act(() => {
            ReactDOM.render(component, container);
        });
    });


    it('+check Contexts displaying', async () => {
        let contexts = await import (`${process.env.REACT_APP_REQUEST_PATH}/contexts`);
        contexts = contexts.default;
        expect(contexts.length).toBe(2);

        act(() => { //Set contexts to Filter state
            store.dispatch(filtersDataActions.setContextsDataByFilter(filterName, contexts));
        });

        act(() => { //Init filter contexts checks
            store.dispatch(filtersDataActions.setContextsChecksByFilter(filterName, []));
        });

        act(() => {
            ReactDOM.render(component, container);
        });

        const toggleContextsButton = container.querySelector(`.toggle_CONTEXTS`);
        expect(toggleContextsButton).not.toBe(null);

        act(() => { //Toggle on contexts menu
            toggleContextsButton.dispatchEvent(new MouseEvent('click'));
        });

        const checkContextsInput_1 = container.querySelector(`#${filterName}_contexts_1`);
        expect(checkContextsInput_1).not.toBe(null);

        act(() => { //Check context (id = 1)
            checkContextsInput_1.dispatchEvent(new MouseEvent('click'));
        });

        const checkContextsInput_2 = container.querySelector(`#${filterName}_contexts_2`);
        expect(checkContextsInput_2).not.toBe(null);

        act(() => { //Check context (id = 2)
            checkContextsInput_2.dispatchEvent(new MouseEvent('click'));
        });

        const checkContextsInput_3 = container.querySelector(`#${filterName}_contexts_3`); //Check is not exist (id = 3)
        expect(checkContextsInput_3).toBe(null);
    });

    it('+check Dimentions displaying', async () => {
        act(() => { //Init filter contexts checks
            store.dispatch(filtersDataActions.setContextsChecksByFilter(filterName, [2]));
        });

        let dimentions = await import (`${process.env.REACT_APP_REQUEST_PATH}/categories`);
        dimentions = dimentions.default;
        expect(dimentions.length).toBe(4);

        act(() => { //Make sync inserting
            store.dispatch({
                type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER_SUCCEEDED,
                name: filterName,
                data: dimentions,
            });
        });

        act(() => { //Init filter contexts checks
            store.dispatch(filtersDataActions.setDimentionsChecksByFilter(filterName, [1]));
        });

        act(() => {
            ReactDOM.render(component, container);
        });

        const toggleDimentionsButton = container.querySelector(`.toggle_DIMENTIONS`);
        expect(toggleDimentionsButton).not.toBe(null);

        act(() => { //Toggle on dimentions menu
            toggleDimentionsButton.dispatchEvent(new MouseEvent('click'));
        });

        const checkDimentionsInput_1 = container.querySelector(`#${filterName}_dimentions_1`); //Dimention id = 1 is not exists
        expect(checkDimentionsInput_1).toBe(null);

        const checkDimentionsInput_3 = container.querySelector(`#${filterName}_dimentions_3`); //Dimention id = 3 is exists
        expect(checkDimentionsInput_3).not.toBe(null);

        act(() => { //Check dimention (id = 3)
            checkDimentionsInput_3.dispatchEvent(new MouseEvent('click'));
        });
    });

    it('+check Filters displaying', async () => {
        let fnc = data => {console.log(data)};

        let component = (
            <Provider store={store}>
                <ConnectedFilter
                    name={filterName}
                    onGetData={fnc}
                />
            </Provider>
        );

        let container = document.createElement('div');
        document.body.appendChild(container);


        act(() => { //Init filter contexts checks
            store.dispatch(filtersDataActions.setContextsChecksByFilter(filterName, [1, 2]));
        });

        let dimentions = await import (`${process.env.REACT_APP_REQUEST_PATH}/categories`);
        dimentions = dimentions.default;
        expect(dimentions.length).toBe(4);

        act(() => { //Make sync inserting
            store.dispatch({
                type: filterDataConstants.SET_DIMENTIONS_LIST_BY_FILTER_SUCCEEDED,
                name: filterName,
                data: dimentions,
            });
        });

        act(() => { //Init filter contexts checks
            store.dispatch(filtersDataActions.setDimentionsChecksByFilter(filterName, [1, 4]));
        });

        let filters = await import (`${process.env.REACT_APP_REQUEST_PATH}/filters`);
        filters = filters.default;
        expect(filters.length).toBe(8);

        act(() => { //Make sync inserting
            store.dispatch({
                type: filterDataConstants.SET_FILTERS_LIST_BY_FILTER_SUCCEEDED,
                name: filterName,
                data: filters,
            });
        });

        act(() => { //Init filter contexts checks
            store.dispatch(filtersDataActions.setFiltersChecksByFilter(filterName, [36]));
        });

        act(() => {
            ReactDOM.render(component, container);
        });

        let checkFiltersInput_2 = container.querySelector(`#${filterName}_filters_2`); //Filter id = 2 is exists
        expect(checkFiltersInput_2).not.toBe(null);

        act(() => { //Check filter (id = 3)
            checkFiltersInput_2.dispatchEvent(new MouseEvent('click'));
        });

        const checkFiltersInput_3 = container.querySelector(`#${filterName}_filters_3`); //Filter id = 3 is exists
        expect(checkFiltersInput_3).toBe(null);

        let checkFiltersInput_36 = container.querySelector(`#${filterName}_filters_36`); //Filter id = 36 is exists
        expect(checkFiltersInput_36).not.toBe(null);

        act(() => { //Check filter (id = 3)
            checkFiltersInput_36.dispatchEvent(new MouseEvent('click'));
        });


        /*Checking out one of a contexts (id = 1)*/

        act(() => { //Init filter contexts checks
            store.dispatch(filtersDataActions.setContextsChecksByFilter(filterName, [2]));
        });

        checkFiltersInput_2 = container.querySelector(`#${filterName}_filters_2`); //Filter id = 2 is exists
        expect(checkFiltersInput_2).toBe(null); //Missed after removing id = 1 contexts check.

        checkFiltersInput_36 = container.querySelector(`#${filterName}_filters_36`); //Filter id = 36 is exists
        expect(checkFiltersInput_36).not.toBe(null);

        act(() => { //Check filter (id = 3)
            checkFiltersInput_36.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });

    });
});