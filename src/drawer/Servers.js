import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';
import ReactTable from 'react-table';

import styles from './styles/Servers.module.css';

const initialData = [
    {
        name: 'oathkeeper:50051',
    },
    {
        name: 'longclaw:50051',
    },
];

export default class Servers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: initialData,
            isEditing: false,
            editValue: '',
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleSave() {
        this.setState(state => ({
            data: [...state.data, { name: state.editValue }],
            editValue: '',
            isEditing: false,
        }));
    }
    handleCancel() {
        this.setState({ isEditing: false });
    }
    handleDelete(nameToDelete) {
        this.setState(state => ({
            data: state.data.filter(({ name }) => name !== nameToDelete),
            editValue: '',
            isEditing: false,
        }));
    }
    render() {
        const { isEditing, data } = this.state;
        return (
            <div>
                <table>
                    <tr>
                        <th>Servers</th>
                    </tr>
                    {data.map(({ name }) => (
                        <tr>
                            <td>
                                {name}
                                <button onClick={() => this.handleDelete(name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
                {isEditing && (
                    <React.Fragment>
                        <input
                            value={this.state.editValue}
                            onChange={e => this.setState({ editValue: e.target.value })}
                        />
                        <button onClick={this.handleSave}>Save</button>
                        <button onClick={this.handleCancel}>Cancel</button>
                    </React.Fragment>
                )}
                <button disabled={isEditing} onClick={() => this.setState({ isEditing: true })}>
                    Add Server
                </button>
            </div>
        );
    }
}

Servers.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};
