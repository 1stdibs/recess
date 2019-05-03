import React, { useContext } from 'react';
import { RecessContext } from './RecessContext';
import Button from './Button';

import styles from './styles/ResultsToolbar.module.css';

export default function ResultsToolbar({ service, onChange, grpcRequestTime }) {
    const { viewParsed, setViewParsed } = useContext(RecessContext);
    return (
        <div className={styles.toolbarWrapper}>
            <React.Fragment>
                {viewParsed ? (
                    <Button onClick={() => setViewParsed(false)}>View Raw</Button>
                ) : (
                    <Button onClick={() => setViewParsed(true)}>View Parsed</Button>
                )}
                {!!grpcRequestTime && (
                    <div className={styles.responseTime}>
                        Response Time: <span className={styles.timeValue}>{grpcRequestTime}ms</span>
                    </div>
                )}
            </React.Fragment>
        </div>
    );
}
