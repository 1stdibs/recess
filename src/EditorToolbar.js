import React, { useContext, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { RecessContext } from './RecessContext';
import Button from './Button';
import Toggle from './Toggle';
import { copyToClipboard, formatGrpcUrl } from './helpers/grpcurl';
import styles from './styles/EditorToolbar.module.css';

export default function EditorToolbar() {
    const [grpcurlClicked, setGrpcurlClicked] = useState(false);
    const grpcurlClickedRef = useRef();
    const {
        useCamelCase,
        setCamelCase,
        formatRequest,
        insertMock,
        selectedServer,
        selectedService,
        selectedMethod,
        metadata,
        requestText,
    } = useContext(RecessContext);

    useEffect(
        () => () => {
            clearTimeout(grpcurlClickedRef.current);
        },
        []
    );
    function handleGrpcUrlClick() {
        const grpcUrl = formatGrpcUrl(
            selectedServer,
            selectedService,
            selectedMethod,
            metadata,
            requestText
        );
        setGrpcurlClicked(true);
        grpcurlClickedRef.current = setTimeout(() => setGrpcurlClicked(false), 750);
        copyToClipboard(grpcUrl);
    }
    const isGrpcurlDisabled = selectedServer === null || selectedService === null;

    return (
        <>
            <Button onClick={formatRequest}>Format</Button>{' '}
            <Button onClick={insertMock}>Insert Mock</Button>
            <Toggle
                onChange={setCamelCase}
                selected={useCamelCase}
                options={[
                    { label: 'snake_case', value: false },
                    { label: 'camelCase', value: true },
                ]}
            />
            <Button
                disabled={isGrpcurlDisabled}
                onClick={handleGrpcUrlClick}
                title="Copy grpcurl to clipboard"
            >
                gRPCurl{' '}
                <span
                    className={classnames(styles.emojiIcon, {
                        [styles.checkmarkVisible]: grpcurlClicked,
                    })}
                >
                    <span className={styles.copy}>📄</span>
                    <span className={styles.copyOverlay}>📄</span>
                    <span className={styles.checkmarkOverlay}>✓{/* copied */}</span>
                </span>
            </Button>
        </>
    );
}
