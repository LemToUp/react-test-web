import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/ConfigureStore';
import WidgetPanel from './WidgetPanel';

const store = configureStore();

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <WidgetPanel key={1} number={1}/>
        </Provider>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
