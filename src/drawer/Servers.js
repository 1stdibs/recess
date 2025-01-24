import React, { useContext, useState } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import Input from '../Input';
import Button from '../Button';
import SectionTitle from './SectionTitle';
import { ReactComponent as PlusIcon } from '../icons/plus-icon.svg';
import { ReactComponent as TrashIcon } from '../icons/trashcan.svg';
import { ReactComponent as Lock } from '../icons/lock.svg';

import styles from './styles/Servers.module.css';
const defaultPort = '5300';
export default function Servers() {
    const { servers, selectedServer, selectServer, addServer, deleteServer } =
        useContext(RecessContext);
    const [editName, setEditName] = useState('');
    const [editPort, setEditPort] = useState(defaultPort);
    const [editSsl, setEditSsl] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    function onKeyDown(e) {
        if (e.keyCode === 27) {
            // escape
            e.preventDefault();
            setEditName('');
            setEditPort(defaultPort);
            setEditSsl(true);
            setIsEditing(false);
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        addServer({ name: editName, port: editPort, ssl: editSsl });
        setEditName('');
        setEditPort(defaultPort);
        setEditSsl(true);
        setIsEditing(false);
        selectServer({ name: editName, port: editPort, ssl: editSsl });
    }
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Servers"
                action={<PlusIcon onClick={() => setIsEditing(true)} />}
            />
            {servers.map(({ name, port, ssl }, i) => (
                <ClickableRow
                    key={`${name}:${port}:${ssl}`}
                    onClick={() => selectServer({ name, port, ssl })}
                    isSelected={
                        !!selectedServer &&
                        selectedServer.name === name &&
                        selectedServer.port === port &&
                        selectedServer.ssl === ssl
                    }
                    ActionIcon={TrashIcon}
                    onClickAction={() => deleteServer(i)}
                >
                    {ssl && <Lock className={styles.lock} />}
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
                        style={{flex: .5}}
                        onChange={(e) => setEditPort(e.target.value)}
                    />
                    <label className={styles.checkboxLabel}>
                        <input type="checkbox" checked={editSsl} onChange={e => setEditSsl(e.target.checked)} />
                        <div>SSL</div>
                    </label>
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </div>
    );
}
