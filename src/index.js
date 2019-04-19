import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore'
import * as serviceWorker from './serviceWorker';

import { filtersActions } from './actions/Filters'

const store = configureStore();

store.dispatch(filtersActions.getContexts());

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
