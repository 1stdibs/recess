import React, { useContext } from 'react';
import Inspector, { chromeDark } from 'react-inspector';
import { RecessContext } from './RecessContext';
import styles from './styles/Results.module.css';

const inspectorTheme = {
    ...chromeDark,
    BASE_FONT_FAMILY: 'monospace',
    BASE_FONT_SIZE: '13px',

    TREENODE_FONT_FAMILY: 'monospace',
    TREENODE_FONT_SIZE: '13px',

    BASE_BACKGROUND_COLOR: 'var(--color-request-bg)',
    BASE_COLOR: 'var(--color-code-text)',
    OBJECT_NAME_COLOR: 'var(--color-highlight)',
    OBJECT_VALUE_STRING_COLOR: 'var(--color-code-string)',
};

console.log(inspectorTheme);

export default function Results({ response }) {
    const { viewParsed } = useContext(RecessContext);
    return (
        <div className={styles.wrapper}>
            {response !== null && (
                <React.Fragment>
                    {viewParsed ? (
                        <Inspector theme={inspectorTheme} expandLevel={1} data={response} />
                    ) : (
                        <code className={styles.code}>{JSON.stringify(response, null, 2)}</code>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}
