import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import Servers from './Servers';
import Services from './Services';
import Methods from './Methods';
import { RecessContext } from '../RecessContext';

import styles from './styles/Drawer.module.css';

export default function Drawer({ isOpen, onToggle }) {
    const { serverDataIsLoading } = useContext(RecessContext);
    return (
        <div
            className={styles.wrapper}
            style={{
                width: 1200,
                left: isOpen ? 0 : '-1200px',
            }}
        >
            <SplitPane
                defaultSize="33%"
                split="vertical"
                resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
            >
                <Servers />
                {serverDataIsLoading ? (
                    <div>Loading Server Data</div>
                ) : (
                    <SplitPane
                        defaultSize="50%"
                        split="vertical"
                        resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
                    >
                        <Services />
                        <Methods />
                    </SplitPane>
                )}
            </SplitPane>
            <button onClick={onToggle} className={styles.openButton}>
                {isOpen ? 'Close' : 'Open'}
            </button>
        </div>
    );
}

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};
