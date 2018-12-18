import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecessContextManager } from './RecessContext';

import './styles/index.css';
import 'codemirror/lib/codemirror.css';

ReactDOM.render(
    <RecessContextManager>
        <App />
    </RecessContextManager>,
    document.getElementById('root')
);
