import React, { useContext } from 'react';
import Editor from './Editor';
import styles from './styles/EditorWrapper.module.css';
import { RecessContext } from './RecessContext';

export default function EditorWrapper() {
    const {
        autoCompleteData,
        requestText,
        setRequestText,
        executeRequest,
        useCamelCase,
        setCamelCase,
        formatRequest,
    } = useContext(RecessContext);
    return (
        <div className={styles.editorWrapper}>
            <div className={styles.toolbar}>
                <button onClick={formatRequest}>Format</button>
                {useCamelCase ? (
                    <button onClick={() => setCamelCase(false)}>Use snake_case</button>
                ) : (
                    <button onClick={() => setCamelCase(true)}>Use camelCase</button>
                )}
            </div>
            <Editor
                autoCompleteData={autoCompleteData}
                value={requestText}
                onEdit={setRequestText}
                onRunQuery={executeRequest}
            />
        </div>
    );
}
