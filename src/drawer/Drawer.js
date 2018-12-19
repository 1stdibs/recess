import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import Servers from './Servers';
import Services from './Services';
import { RecessContext } from '../RecessContext';

import styles from './styles/Drawer.module.css';

export default function Drawer({ isOpen, onToggle }) {
    const { serverDataIsLoading } = useContext(RecessContext);
    return (
        <div
            className={styles.wrapper}
            style={{
                width: 600,
                left: isOpen ? 0 : '-600px',
            }}
        >
            <SplitPane
                defaultSize="50%"
                split="vertical"
                resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
            >
                <Servers />
                {serverDataIsLoading ? <div>Loading Server Data</div> : <Services />}
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
