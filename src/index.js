import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './_base/reducers';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import URLs from './_base/_urls';

const store = createStore(rootReducer);

const cook = document.cookie.split('; ');
const _t = cook.map(c => {
    if(c.split('=')[0] === 'satellizer_token') return c.split('=')[1];
});
localStorage.setItem('satellizer_token', _t);
const _token = localStorage.getItem('satellizer_token');

// HTTP config ----------------------------------------------------//
axios.defaults.baseURL = URLs.bot;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + _token;
// END - HTTP config ----------------------------------------------//

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
