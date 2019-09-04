import React, { useContext, Fragment } from 'react';
import { RecessContext } from './RecessContext';
import Button from './Button';

import styles from './styles/ResultsToolbar.module.css';

export default function ResultsToolbar({ service, onChange, grpcRequestTime, protoMessageSize }) {
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
                    <Fragment>
                        <div className={styles.responseSize}>
                            Proto Message Size:{' '}
                            <span className={styles.sizeValue}>{protoMessageSize} bytes</span>
                        </div>
                        <div className={styles.responseTime}>
                            Response Time:{' '}
                            <span className={styles.timeValue}>{grpcRequestTime}ms</span>
                        </div>
                    </Fragment>
                )}
            </React.Fragment>
        </div>
    );
}
