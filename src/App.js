import React, { useContext } from 'react';
import SplitPane from 'react-split-pane';
import Editor from './Editor';
import Results from './Results';
import Servers from './drawer/Servers';
import Services from './drawer/Services';

import styles from './styles/App.module.css';
import { RecessContext } from './RecessContext';

export default function App() {
    const {
        requestText,
        response,
        setRequestText,
        executeRequest,
        isLoadingServerData,
    } = useContext(RecessContext);
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
                    <Editor
                        value={requestText}
                        onEdit={setRequestText}
                        onRunQuery={executeRequest}
                    />
                    <Results response={response} />
                </SplitPane>
            </SplitPane>
        </div>
    );
}
