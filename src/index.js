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
let _t = null;
let _token = null;

for(const c in cook) {
    if(c.split('=')[0] === 'satellizer_token') {
        _t = c.split('=')[1];
        return;
    }
}

if (_t) {
    _token = _t;
    localStorage.setItem('satellizer_token', _t);
}

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
