import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/ClickableRow.module.css';
import classNames from 'classnames';

export default function ClickableRow({ children, onClick, isSelected }) {
    return (
        <tr className={styles.row}>
            <td className={classNames({ [styles.isSelected]: isSelected })} onClick={onClick}>
                {children}
            </td>
        </tr>
    );
}

ClickableRow.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};
