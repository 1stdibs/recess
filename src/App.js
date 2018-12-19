import React, { useContext } from 'react';
import SplitPane from 'react-split-pane';
import EditorWrapper from './EditorWrapper';
import Results from './Results';
import Servers from './drawer/Servers';
import Services from './drawer/Services';
import Metadata from './Metadata';

import styles from './styles/App.module.css';
import { RecessContext } from './RecessContext';

export default function App() {
    const { response, isLoadingServerData } = useContext(RecessContext);
    return (
        <div className={styles.wrapper}>
            <SplitPane
                defaultSize="30%"
                split="vertical"
                paneStyle={{ overflow: 'auto' }}
                resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
            >
                <SplitPane
                    defaultSize="40%"
                    split="vertical"
                    paneStyle={{ overflow: 'auto' }}
                    resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
                >
                    <Servers />
                    {isLoadingServerData ? <div>Loading Server Data</div> : <Services />}
                </SplitPane>

                <SplitPane
                    defaultSize="50%"
                    split="vertical"
                    paneStyle={{ overflow: 'auto' }}
                    resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
                >
                    <SplitPane
                        defaultSize="80%"
                        split="horizontal"
                        paneStyle={{ overflow: 'auto' }}
                        resizerStyle={{ backgroundColor: 'grey', height: 5, cursor: 'row-resize' }}
                    >
                        <EditorWrapper />
                        <Metadata />
                    </SplitPane>
                    <Results response={response} />
                </SplitPane>
            </SplitPane>
        </div>
    );
}
