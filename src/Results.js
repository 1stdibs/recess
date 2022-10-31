import classnames from 'classnames';
import React, { useContext } from 'react';
import { Inspector, chromeDark } from 'react-inspector';
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
};

export default function Results({ response, error }) {
    const { viewParsed } = useContext(RecessContext);

    let obj = response;
    let dynamicInspectorTheme;
    if (error) {
        dynamicInspectorTheme = {
            ...inspectorTheme,
            OBJECT_VALUE_STRING_COLOR: 'red',
        };
        obj = error;
    } else {
        dynamicInspectorTheme = {
            ...inspectorTheme,
            OBJECT_VALUE_STRING_COLOR: 'var(--color-code-string)',
        };
    }

    return (
        <div className={styles.wrapper}>
            {obj !== null && (
                <React.Fragment>
                    {viewParsed ? (
                        <Inspector theme={dynamicInspectorTheme} expandLevel={1} data={obj} />
                    ) : (
                        <code
                            className={classnames({
                                [styles.code]: true,
                                [styles.success]: !error,
                                [styles.error]: error,
                            })}
                        >
                            {JSON.stringify(obj, null, 2)}
                        </code>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}
