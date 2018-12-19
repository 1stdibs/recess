import React, { useContext, useState } from 'react';
import { RecessContext } from './RecessContext';
import Table from './drawer/Table';

export default function Metadata() {
    const { metadata, addMetadata, deleteMetadata } = useContext(RecessContext);
    const [editKey, setEditKey] = useState('');
    const [editValue, setEditValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th colSpan="3">Metadata</th>
                    </tr>
                    {Object.entries(metadata).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                            <td>
                                <button onClick={() => deleteMetadata({ key })}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {isEditing && (
                <React.Fragment>
                    <input
                        placeholder="Key"
                        value={editKey}
                        onChange={e => setEditKey(e.target.value)}
                    />
                    <input
                        placeholder="Value"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            addMetadata({ key: editKey, value: editValue });
                            setEditKey('');
                            setEditValue('');
                            setIsEditing(false);
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setEditKey('');
                            setEditValue('');
                            setIsEditing(false);
                        }}
                    >
                        Cancel
                    </button>
                </React.Fragment>
            )}
            <div>
                <button disabled={isEditing} onClick={() => setIsEditing(true)}>
                    Add Metadata
                </button>
            </div>
        </div>
    );
}
