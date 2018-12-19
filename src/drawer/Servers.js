import React, { useContext, useState } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import Table from './Table';

const defaultPort = 8443;

export default function Servers() {
    const { servers, selectedServer, selectServer, addServer, deleteServer } = useContext(
        RecessContext
    );
    const [editName, setEditName] = useState('');
    const [editPort, setEditPort] = useState(defaultPort);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th>Servers</th>
                    </tr>
                    {servers.map(({ name, port }) => (
                        <ClickableRow
                            key={`${name}:${port}`}
                            onClick={() => selectServer({ name, port })}
                            isSelected={
                                !!selectedServer &&
                                selectedServer.name === name &&
                                selectedServer.port === port
                            }
                        >
                            {name}:{port}
                            <button onClick={() => deleteServer({ name, port })}>Delete</button>
                        </ClickableRow>
                    ))}
                </tbody>
            </Table>
            {isEditing && (
                <React.Fragment>
                    <input
                        placeholder="Host Name"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                    />
                    <input
                        placeholder="Port"
                        value={editPort}
                        onChange={e => setEditPort(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            addServer({ name: editName, port: editPort });
                            setEditName('');
                            setEditPort(defaultPort);
                            setIsEditing(false);
                        }}
                    >
                        Save
                    </button>
                    <button onClick={deleteServer}>Cancel</button>
                </React.Fragment>
            )}
            <div>
                <button disabled={isEditing} onClick={() => setIsEditing(true)}>
                    Add Server
                </button>
            </div>
        </div>
    );
}
