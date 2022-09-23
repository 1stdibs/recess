import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import SplitPane from 'react-split-pane';
import EditorToolbar from './EditorToolbar';
import Editor from './Editor';
import ResultsWrapper from './ResultsWrapper';
import Servers from './drawer/Servers';
import Services from './drawer/Services';
import ServiceToolbar from './drawer/ServiceToolbar';
import Metadata from './Metadata';
import ToolbarWrapper from './ToolbarWrapper';
import History from './History';
import { setMethodSearchText } from './actionCreators/servicesActions';
import { EDIT_REQUEST } from './reducer';
import executeRequest from './actionCreators/executeRequest';
import fetchServerData from './actionCreators/fetchServerData';

import styles from './styles/App.module.css';

export default function App() {
    const store = useStore();
    const dispatch = useDispatch();
    const serverData = useSelector((state) => state.serverData);
    const requestText = useSelector((state) => state.requestText);
    const selectedMethod = useSelector((state) => state.selectedMethod);
    const historyVisible = useSelector((state) => state.historyVisible);

    const selectedServer = useSelector((state) => state.selectedServer);
    const useCamelCase = useSelector((state) => state.useCamelCase);

    useEffect(() => {
        const abortController = new AbortController();
        fetchServerData({
            selectedServer,
            useCamelCase,
            dispatch,
            signal: abortController.signal,
        });
        return () => {
            abortController.abort();
        };
    }, [dispatch, selectedServer, useCamelCase]);

    return (
        <div className={styles.wrapper}>
            <SplitPane
                defaultSize="35%"
                split="vertical"
                paneStyle={{ overflow: 'auto' }}
                style={{ paddingLeft: '10px' }}
                resizerStyle={{
                    backgroundColor: 'var(--color-dividers)',
                    width: 4,
                    cursor: 'col-resize',
                }}
            >
                <ToolbarWrapper
                    toolbar={
                        <ServiceToolbar
                            onChange={(searchText) => setMethodSearchText({ dispatch, searchText })}
                            placeholder="Search Services"
                        />
                    }
                >
                    <SplitPane
                        defaultSize="55%"
                        size={historyVisible ? '50%' : '95%'}
                        maxSize={-55}
                        split="horizontal"
                        paneStyle={{ overflow: 'auto' }}
                        resizerStyle={{
                            backgroundColor: 'var(--color-dividers)',
                            height: 10,
                            cursor: 'row-resize',
                        }}
                    >
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

                        <History />
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
                                selectedMethod={selectedMethod}
                                types={serverData?.types}
                                value={requestText}
                                onEdit={(requestText) =>
                                    dispatch({ type: EDIT_REQUEST, requestText })
                                }
                                onRunQuery={() => executeRequest(store, dispatch)}
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
