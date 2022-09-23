import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClickableRow from './ClickableRow';
import Input from '../Input';
import Button from '../Button';
import SectionTitle from './SectionTitle';
import { ReactComponent as PlusIcon } from '../icons/plus-icon.svg';
import { ReactComponent as TrashIcon } from '../icons/trashcan.svg';

import styles from './styles/Servers.module.css';
import { addServer, deleteServer, selectServer } from '../actionCreators/serverActions';

const defaultPort = '5300';
export default function Servers() {
    const dispatch = useDispatch();
    const selectedServer = useSelector((state) => state.selectedServer);
    const servers = useSelector((state) => state.servers);

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
        addServer({ dispatch, server: { name: editName, port: editPort } });
        setEditName('');
        setEditPort(defaultPort);
        setIsEditing(false);
        selectServer({ dispatch, server: { name: editName, port: editPort } });
    }
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Servers"
                action={<PlusIcon onClick={() => setIsEditing(true)} />}
            />
            {servers.map(({ name, port }, index) => (
                <ClickableRow
                    key={`${name}:${port}`}
                    onClick={() => selectServer({ dispatch, server: { name, port } })}
                    isSelected={
                        !!selectedServer &&
                        selectedServer.name === name &&
                        selectedServer.port === port
                    }
                    ActionIcon={TrashIcon}
                    onClickAction={() => deleteServer({ dispatch, index })}
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
