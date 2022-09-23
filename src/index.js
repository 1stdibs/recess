import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer, { initialState } from './reducer';

import './styles/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/theme/monokai.css';

const store = createStore(reducer, {
    ...initialState,
    ...JSON.parse(localStorage.getItem('recessState')),
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(
        'recessState',
        JSON.stringify({
            ...state,
            // don't store data fetched from back end
            serverData: null,
            response: null,
            requestAbortController: null,
        })
    );
});

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
