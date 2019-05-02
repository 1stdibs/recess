import React, { useContext, useState } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import Input from '../Input';
import SectionTitle from './SectionTitle';
import { ReactComponent as PlusIcon } from '../icons/plus-icon.svg';
import { ReactComponent as TrashIcon } from '../icons/trashcan.svg';

import styles from './styles/Servers.module.css';

export default function Servers() {
    const { servers, selectedServer, selectServer, addServer, deleteServer } = useContext(
        RecessContext
    );
    const [editName, setEditName] = useState('');
    const [editPort, setEditPort] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    function onKeyDown(e) {
        if (e.keyCode === 13) {
            // enter
            e.preventDefault();
            addServer({ name: editName, port: editPort });
            setEditName('');
            setEditPort('');
            setIsEditing(false);
            selectServer({ name: editName, port: editPort });
        } else if (e.keyCode === 27) {
            // escape
            e.preventDefault();
            setEditName('');
            setEditPort('');
            setIsEditing(false);
        }
    }
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Servers"
                action={<PlusIcon onClick={() => setIsEditing(true)} />}
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
                <form className={styles.form}>
                    <Input
                        onKeyDown={onKeyDown}
                        autoFocus
                        placeholder="Host Name"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                    />
                    <Input
                        onKeyDown={onKeyDown}
                        placeholder="Port"
                        value={editPort}
                        onChange={e => setEditPort(e.target.value)}
                    />
                </form>
            )}
        </div>
    );
}
