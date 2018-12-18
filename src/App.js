import React, { Component } from 'react';
import Editor from './Editor';
import Results from './Results';
import styles from './styles/App.module.css';

export default function App() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Editor />
            </div>
            <div className={styles.left}>
                <Results />
            </div>
        </div>
    );
}
