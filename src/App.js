import React, { useContext } from 'react';
import SplitPane from 'react-split-pane';
import ResultsToolbar from './ResultsToolbar';
import EditorToolbar from './EditorToolbar';
import Editor from './Editor';
import ResultsWrapper from './ResultsWrapper';
import Servers from './drawer/Servers';
import Services from './drawer/Services';
import ServiceToolbar from './drawer/ServiceToolbar';
import Metadata from './Metadata';
import { RecessContext } from './RecessContext';
import ToolbarWrapper from './ToolbarWrapper';

import styles from './styles/App.module.css';

export default function App() {
    const {
        response,
        autoCompleteData,
        requestText,
        setRequestText,
        executeRequest,
        setMethodSearchText,
    } = useContext(RecessContext);
    return (
        <div className={styles.wrapper}>
            <SplitPane
                defaultSize="30%"
                split="vertical"
                paneStyle={{ overflow: 'auto' }}
                resizerStyle={{
                    backgroundColor: 'var(--color-dividers)',
                    width: 4,
                    cursor: 'col-resize',
                }}
            >
                <ToolbarWrapper toolbar={<ServiceToolbar onChange={setMethodSearchText} />}>
                    <SplitPane
                        defaultSize="40%"
                        split="vertical"
                        paneStyle={{ overflow: 'auto' }}
                        resizerStyle={{
                            backgroundColor: 'var(--color-dividers)',
                            width: 4,
                            cursor: 'col-resize',
                        }}
                    >
                        <Servers />
                        <Services />
                    </SplitPane>
                </ToolbarWrapper>

                <SplitPane
                    defaultSize="50%"
                    split="vertical"
                    resizerStyle={{
                        backgroundColor: 'var(--color-dividers)',
                        width: 4,
                        cursor: 'col-resize',
                    }}
                >
                    <ToolbarWrapper toolbar={<EditorToolbar />}>
                        <SplitPane
                            defaultSize="80%"
                            split="horizontal"
                            paneStyle={{ overflow: 'auto' }}
                            resizerStyle={{
                                backgroundColor: 'var(--color-dividers)',
                                height: 4,
                                cursor: 'row-resize',
                            }}
                        >
                            <Editor
                                autoCompleteData={autoCompleteData}
                                value={requestText}
                                onEdit={setRequestText}
                                onRunQuery={executeRequest}
                            />
                            <Metadata />
                        </SplitPane>
                    </ToolbarWrapper>
                    <ResultsWrapper />
                </SplitPane>
            </SplitPane>
        </div>
    );
}
