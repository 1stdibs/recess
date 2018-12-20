import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/SectionTitle.module.css';

export default function SecitonTitle({ title, ActionIcon, onClickAction }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.action} onClick={onClickAction}>
                <ActionIcon className={styles.icon} />
            </div>
        </div>
    );
}

SecitonTitle.propTypes = {
    title: PropTypes.node.isRequired,
    ActionIcon: PropTypes.object.isRequired,
    onClickAction: PropTypes.func.isRequired,
};
