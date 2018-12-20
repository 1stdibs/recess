import React, { useContext } from 'react';
import { RecessContext } from './RecessContext';
import Button from './Button';
import styles from './styles/EditorToolbar.module.css';

export default function EditorToolbar() {
    const { useCamelCase, setCamelCase, formatRequest, insertMock } = useContext(RecessContext);
    return (
        <React.Fragment>
            <div className={styles.buttonWrapper}>
                <Button onClick={formatRequest}>Format</Button>
            </div>
            <div className={styles.buttonWrapper}>
                <Button onClick={insertMock}>Insert Mock</Button>{' '}
            </div>
            <div className={styles.buttonWrapper}>
                {useCamelCase ? (
                    <Button onClick={() => setCamelCase(false)}>Use snake_case</Button>
                ) : (
                    <Button onClick={() => setCamelCase(true)}>Use camelCase</Button>
                )}
            </div>
        </React.Fragment>
    );
}
