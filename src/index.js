import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecessContextManager } from './RecessContext';

import './styles/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/theme/monokai.css';

ReactDOM.render(
    <RecessContextManager>
        <App />
    </RecessContextManager>,
    document.getElementById('root')
);
