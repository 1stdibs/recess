import React, { useContext } from 'react';
import { RecessContext } from './RecessContext';
import Toggle from './Toggle';

import styles from './styles/ResultsToolbar.module.css';

export default function ResultsToolbar({ grpcRequestTime, protoMessageSize }) {
    const { viewParsed, setViewParsed } = useContext(RecessContext);
    return (
        <>
            <Toggle
                selected={viewParsed}
                onChange={setViewParsed}
                options={[
                    { label: 'Raw', value: false },
                    { label: 'Parsed', value: true },
                ]}
            />

            {!!grpcRequestTime && (
                <>
                    <div className={styles.responseSize}>
                        Proto Message Size:{' '}
                        <span className={styles.sizeValue}>{protoMessageSize} bytes</span>
                    </div>
                    <div className={styles.responseTime}>
                        Response Time: <span className={styles.timeValue}>{grpcRequestTime}ms</span>
                    </div>
                </>
            )}
        </>
    );
}
