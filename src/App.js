import React, { useState, useContext } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './Editor';
import Results from './Results';
import Drawer from './drawer/Drawer';

import styles from './styles/App.module.css';
import { RecessContext } from './RecessContext';

export default function App() {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const { requestText, responseText, setRequestText } = useContext(RecessContext);
    return (
        <div className={styles.wrapper}>
            <Drawer isOpen={drawerOpen} onToggle={() => setDrawerOpen(state => !state)} />
            <SplitPane
                defaultSize="50%"
                split="vertical"
                resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
            >
                <Editor requestText={requestText} setRequestText={setRequestText} />
                <Results responseText={responseText} />
            </SplitPane>
        </div>
    );
}
