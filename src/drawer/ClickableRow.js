import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles/ClickableRow.module.css';

export default function ClickableRow({ children, ActionIcon, onActionClick, onClick, isSelected }) {
    return (
        <div
            className={classNames(styles.row, { [styles.isSelected]: isSelected })}
            onClick={onClick}
        >
            <div className={styles.label}>{children}</div>
            {!!ActionIcon && (
                <div
                    className={styles.action}
                    onClick={e => {
                        e.stopPropagation();
                        onActionClick();
                    }}
                >
                    <ActionIcon className={styles.icon} />
                </div>
            )}
        </div>
    );
}

ClickableRow.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};
