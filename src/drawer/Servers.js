import React, { useContext, useState } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import Input from '../Input';
import Button from '../Button';
import SectionTitle from './SectionTitle';
import { ReactComponent as PlusIcon } from '../icons/plus-icon.svg';
import { ReactComponent as TrashIcon } from '../icons/trashcan.svg';

import styles from './styles/Servers.module.css';
const defaultPort = '5300';
export default function Servers() {
    const { servers, selectedServer, selectServer, addServer, deleteServer } =
        useContext(RecessContext);
    const [editName, setEditName] = useState('');
    const [editPort, setEditPort] = useState(defaultPort);
    const [isEditing, setIsEditing] = useState(false);

    function onKeyDown(e) {
        if (e.keyCode === 27) {
            // escape
            e.preventDefault();
            setEditName('');
            setEditPort(defaultPort);
            setIsEditing(false);
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        addServer({ name: editName, port: editPort });
        setEditName('');
        setEditPort(defaultPort);
        setIsEditing(false);
        selectServer({ name: editName, port: editPort });
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
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        onKeyDown={onKeyDown}
                        autoFocus
                        placeholder="Host Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <Input
                        onKeyDown={onKeyDown}
                        placeholder="Port"
                        value={editPort}
                        onChange={(e) => setEditPort(e.target.value)}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </div>
    );
}
