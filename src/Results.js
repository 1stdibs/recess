import React, { useState } from 'react';
import Inspector from 'react-inspector';
import styles from './styles/Editor.module.css';

export default function Results({ responseText }) {
    const [isParsed, setParsed] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div>
                {isParsed ? (
                    <button onClick={() => setParsed(false)}>View Raw</button>
                ) : (
                    <button onClick={() => setParsed(true)}>View Parsed</button>
                )}
            </div>
            {isParsed ? (
                <Inspector expandLevel={1} data={responseText} />
            ) : (
                <code className={styles.code}>{JSON.stringify(responseText, null, 2)}</code>
            )}
        </div>
    );
}
