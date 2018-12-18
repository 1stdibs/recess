import React from 'react';
import SplitPane from 'react-split-pane';
import Editor from './Editor';
import Results from './Results';
import styles from './styles/App.module.css';

export default function App() {
    return (
        <div className={styles.wrapper}>
            <SplitPane
                defaultSize="50%"
                split="vertical"
                resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
            >
                <Editor />
                <Results />
            </SplitPane>
        </div>
    );
}
