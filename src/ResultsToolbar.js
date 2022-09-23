import React from 'react';
import Toggle from './Toggle';

import styles from './styles/ResultsToolbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { VIEW_PARSED } from './reducer';

export default function ResultsToolbar({ grpcRequestTime, protoMessageSize }) {
    const dispatch = useDispatch();
    const viewParsed = useSelector((state) => state.viewParsed);
    return (
        <>
            <Toggle
                selected={viewParsed}
                onChange={(val) => dispatch({ type: VIEW_PARSED, viewParsed: val })}
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
