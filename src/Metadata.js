import React, { useContext, useState } from 'react';
import { RecessContext } from './RecessContext';
import Input from './Input';
import SectionTitle from './drawer/SectionTitle';
import { ReactComponent as PlusIcon } from './icons/plus-icon.svg';
import { ReactComponent as TrashIcon } from './icons/trashcan.svg';

import styles from './styles/Metadata.module.css';

export default function Metadata() {
    const { metadata, addMetadata, deleteMetadata } = useContext(RecessContext);
    const [editKey, setEditKey] = useState('');
    const [editValue, setEditValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    function onKeyDown(e) {
        if (e.keyCode === 13) {
            // enter
            e.preventDefault();
            addMetadata({ key: editKey, value: editValue });
            setEditKey('');
            setEditValue('');
            setIsEditing(false);
        } else if (e.keyCode === 27) {
            // escape
            e.preventDefault();
            setEditKey('');
            setEditValue('');
            setIsEditing(false);
        }
    }

    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Metadata"
                action={<PlusIcon onClick={() => setIsEditing(true)} />}
            />
            {Object.entries(metadata).map(([key, value]) => (
                <div key={key} className={styles.row}>
                    <div className={styles.key}>{key}</div>
                    <div className={styles.value}>{value}</div>
                    <div className={styles.iconWrapper} onClick={() => deleteMetadata({ key })}>
                        <TrashIcon className={styles.icon} />
                    </div>
                </div>
            ))}

            {isEditing && (
                <form className={styles.form}>
                    <Input
                        onKeyDown={onKeyDown}
                        autoFocus
                        placeholder="Key"
                        value={editKey}
                        onChange={e => setEditKey(e.target.value)}
                    />
                    <Input
                        onKeyDown={onKeyDown}
                        placeholder="Value"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                    />
                </form>
            )}
        </div>
    );
}
