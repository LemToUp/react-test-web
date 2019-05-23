import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';
import ConnectedWidgetPanel from './WidgetPanel';
import {act} from 'react-test-renderer';

const store = configureStore();

describe('Filter component testing', () => {
    let container, component;
    let dataList = ['first', 'second'];
    beforeEach(() => {
        component = (
            <Provider store={store}>
                <ConnectedWidgetPanel
                    list={dataList}
                    number={1}
                />
            </Provider>
        );

        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(component, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('get data list', () => {
        ReactDOM.render(component, container);
        let button = container.querySelector(`.toggle-button`);
        expect(button).not.toBe(null);
        act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });

        let firstValue = container.querySelector('#sected_filters_0 p');
        expect(firstValue).not.toBe(null);
        expect(firstValue.innerHTML).toBe('first');

        let secondValue = container.querySelector('#sected_filters_1 p');
        expect(secondValue).not.toBe(null);
        expect(secondValue.innerHTML).toBe('second');

        let thirdValue = container.querySelector('#sected_filters_2 p');
        expect(thirdValue).toBe(null);
    });
});
