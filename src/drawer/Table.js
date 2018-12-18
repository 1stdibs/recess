import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Table.module.css';

export default function Table({ children }) {
    return <table className={styles.table}>{children}</table>;
}

Table.propTypes = {
    children: PropTypes.node.isRequired,
};
