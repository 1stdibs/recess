import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import Button from './Button';
import Toggle from './Toggle';
import { copyToClipboard, formatGrpcUrl } from './helpers/grpcurl';
import styles from './styles/EditorToolbar.module.css';
import { insertMock } from './actionCreators/insertMock';
import { formatRequest } from './actionCreators/formatRequest';
import { USE_CAMEL_CASE } from './reducer';

export default function EditorToolbar() {
    const [grpcurlClicked, setGrpcurlClicked] = useState(false);
    const inputType = useSelector((state) => state.method?.inputType);
    const types = useSelector((state) => state.serverData?.types);
    const requestText = useSelector((state) => state.requestText);
    const useCamelCase = useSelector((state) => state.useCamelCase);
    const selectedServer = useSelector((state) => state.selectedServer);
    const selectedService = useSelector((state) => state.selectedService);
    const selectedMethod = useSelector((state) => state.selectedMethod);
    const metadata = useSelector((state) => state.metadata);
    const dispatch = useDispatch();
    const grpcurlClickedRef = useRef();

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
            <Button onClick={() => formatRequest({ dispatch, requestText })}>Format</Button>{' '}
            <Button onClick={() => insertMock({ dispatch, inputType, types })}>Insert Mock</Button>
            <Toggle
                onChange={(val) => dispatch({ type: USE_CAMEL_CASE, useCamelCase: val })}
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
