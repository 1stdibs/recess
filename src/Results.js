import React, { useState } from 'react';
import Inspector from 'react-inspector';
import styles from './styles/Results.module.css';

export default function Results({ response }) {
    const [isParsed, setParsed] = useState(false);
    return (
        <div className={styles.wrapper}>
            {response !== null && (
                <React.Fragment>
                    <div>
                        {isParsed ? (
                            <button onClick={() => setParsed(false)}>View Raw</button>
                        ) : (
                            <button onClick={() => setParsed(true)}>View Parsed</button>
                        )}
                    </div>
                    {isParsed ? (
                        <Inspector expandLevel={1} data={response} />
                    ) : (
                        <code className={styles.code}>{JSON.stringify(response, null, 2)}</code>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}
