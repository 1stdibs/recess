import React, { useContext, useState } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import SectionTitle from './SectionTitle';
import { ReactComponent as PlusIcon } from '../icons/plus-icon.svg';
import { ReactComponent as TrashIcon } from '../icons/trashcan.svg';

import styles from './styles/Servers.module.css';

const defaultPort = 8443;

export default function Servers() {
    const { servers, selectedServer, selectServer, addServer, deleteServer } = useContext(
        RecessContext
    );
    const [editName, setEditName] = useState('');
    const [editPort, setEditPort] = useState(defaultPort);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Servers"
                onClickAction={() => setIsEditing(true)}
                ActionIcon={PlusIcon}
            />
            {servers.map(({ name, port }, i) => (
                <ClickableRow
                    key={`${name}:${port}`}
                    onClick={() => selectServer({ name, port })}
                    isSelected={
                        !!selectedServer &&
                        selectedServer.name === name &&
                        selectedServer.port === port
                    }
                    ActionIcon={TrashIcon}
                    onClickAction={() => deleteServer(i)}
                >
                    {name}:{port}
                </ClickableRow>
            ))}
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
        </div>
    );
}
