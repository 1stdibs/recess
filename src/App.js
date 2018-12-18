import React from 'react';
import SplitPane from 'react-split-pane';
import Editor from './Editor';
import Results from './Results';
import Drawer from './Drawer';

import styles from './styles/App.module.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: true,
        };
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <Drawer
                    isOpen={this.state.drawerOpen}
                    onToggle={() => this.setState(state => ({ drawerOpen: !state.drawerOpen }))}
                />
                <SplitPane
                    defaultSize="50%"
                    split="vertical"
                    resizerStyle={{ backgroundColor: 'grey', width: 5, cursor: 'col-resize' }}
                >
                    <Editor />
                    <Results />
                </SplitPane>
            </div>
        );
    }
}
