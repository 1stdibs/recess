import React, { useContext } from 'react';
import { RecessContext } from './RecessContext';
import ClickableRow from './drawer/ClickableRow';
import { ReactComponent as TrashIcon } from './icons/trashcan.svg';
import ToolbarWrapper from './ToolbarWrapper';
import ServiceToolbar from './drawer/ServiceToolbar';

import styles from './styles/History.module.css';

function getMatchingHistory(history = [], historySearchText = '') {
    const lowerCaseSearchText = historySearchText.toLowerCase();
    if (historySearchText) {
        return history.filter((h) => {
            const textToSearch = `${h.server.name}:${h.server.port} ${h.serviceName}.${h.methodName}`.toLowerCase();
            return textToSearch.includes(lowerCaseSearchText);
        });
    }
    return history;
}

export default function History() {
    const {
        history,
        selectHistory,
        deleteHistoryEntry,
        historySearchText,
        setHistorySearchText,
        clearAllHistory,
    } = useContext(RecessContext);
    const matchingHistory = getMatchingHistory(history, historySearchText);
    return (
        <ToolbarWrapper
            toolbar={
                <ServiceToolbar onChange={setHistorySearchText} placeholder="Search history" />
            }
        >
            <div className={styles.wrapper}>
                <div className={styles.titleBar}>
                    <div className={styles.title}>History</div>
                    <button
                        className={styles.clearButton}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete all history?')) {
                                clearAllHistory();
                            }
                        }}
                    >
                        Clear All
                    </button>
                </div>
                <div className={styles.entriesContainer}>
                    {matchingHistory.map((h) => {
                        return (
                            <ClickableRow
                                key={h.id}
                                onClick={() => {
                                    selectHistory(h);
                                }}
                                ActionIcon={TrashIcon}
                                onClickAction={() => deleteHistoryEntry(h.id)}
                            >
                                <span className={styles.date}>{h.date}</span>
                                <br />
                                <span>{`${h.server.name}:${h.server.port}`}</span>
                                <br />
                                <span>
                                    {h.serviceName}.
                                    <span className={styles.methodName}>{h.methodName}</span>
                                </span>
                                <br />
                            </ClickableRow>
                        );
                    })}
                </div>
            </div>
        </ToolbarWrapper>
    );
}
