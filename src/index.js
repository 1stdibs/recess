import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RecessContextManager } from './RecessContext';

import './styles/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/theme/monokai.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <RecessContextManager>
        <App />
    </RecessContextManager>
);
