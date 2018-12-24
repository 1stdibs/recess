import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/SectionTitle.module.css';

export default function SectionTitle({ title, action }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            {!!action && <div className={styles.action}>{action}</div>}
        </div>
    );
}

SectionTitle.propTypes = {
    title: PropTypes.node.isRequired,
    action: PropTypes.node,
};
