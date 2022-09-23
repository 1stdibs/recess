import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import ClickableRow from './drawer/ClickableRow';
import { ReactComponent as TrashIcon } from './icons/trashcan.svg';
import ServiceToolbar from './drawer/ServiceToolbar';
import Button from './Button';
import {
    clearAllHistory,
    deleteHistoryEntry,
    selectHistory,
    setHistorySearchText,
    setHistoryVisible,
} from './actionCreators/historyActions';

import styles from './styles/History.module.css';

function getMatchingHistory(history = [], historySearchText = '') {
    const lowerCaseSearchText = historySearchText.toLowerCase();
    if (historySearchText) {
        return history.filter((h) => {
            const textToSearch =
                `${h.server.name}:${h.server.port} ${h.serviceName}.${h.methodName}`.toLowerCase();
            return textToSearch.includes(lowerCaseSearchText);
        });
    }
    return history;
}

export default function History() {
    const store = useStore();
    const dispatch = useDispatch();
    const history = useSelector((state) => state.history);
    const historySearchText = useSelector((state) => state.historySearchText);
    const historyVisible = useSelector((state) => state.historyVisible);
    const matchingHistory = getMatchingHistory(history, historySearchText);
    if (historyVisible) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.toolbarWrapper}>
                    <div className={styles.hideButtonWrapper}>
                        <Button
                            onClick={() => setHistoryVisible({ dispatch, historyVisible: false })}
                        >
                            Hide History
                        </Button>
                    </div>
                    <ServiceToolbar
                        onChange={(searchText) => setHistorySearchText({ dispatch, searchText })}
                        placeholder="Search History"
                    />
                </div>

                <div className={styles.titleBar}>
                    <div className={styles.title}>History</div>
                    <button
                        className={styles.clearButton}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete all history?')) {
                                clearAllHistory({ dispatch });
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
                                isSelected={false}
                                key={h.id}
                                onClick={() => {
                                    selectHistory({ store, dispatch, entry: h });
                                }}
                                ActionIcon={TrashIcon}
                                onClickAction={() =>
                                    deleteHistoryEntry({ dispatch, entryId: h.id })
                                }
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
        );
    } else {
        return (
            <div className={styles.showButtonWrapper}>
                <Button onClick={() => setHistoryVisible(true)}>Show History</Button>
            </div>
        );
    }
}
