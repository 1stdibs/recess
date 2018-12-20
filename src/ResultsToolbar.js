import React, { useContext } from 'react';
import { RecessContext } from './RecessContext';
import Button from './Button';

export default function ResultsToolbar({ service, onChange }) {
    const { viewParsed, setViewParsed } = useContext(RecessContext);
    return (
        <React.Fragment>
            {viewParsed ? (
                <Button onClick={() => setViewParsed(false)}>View Raw</Button>
            ) : (
                <Button onClick={() => setViewParsed(true)}>View Parsed</Button>
            )}
        </React.Fragment>
    );
}
