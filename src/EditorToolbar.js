import React, { useContext } from 'react';
import { RecessContext } from './RecessContext';
import Button from './Button';

export default function EditorToolbar() {
    const { useCamelCase, setCamelCase, formatRequest, insertMock } = useContext(RecessContext);
    return (
        <React.Fragment>
            <Button onClick={formatRequest}>Format</Button>{' '}
            <Button onClick={insertMock}>Insert Mock</Button>{' '}
            {useCamelCase ? (
                <Button onClick={() => setCamelCase(false)}>Use snake_case</Button>
            ) : (
                <Button onClick={() => setCamelCase(true)}>Use camelCase</Button>
            )}
        </React.Fragment>
    );
}
