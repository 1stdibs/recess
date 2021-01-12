import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { ReactComponent as PlayButton } from './icons/play.svg';
import { RecessContext } from './RecessContext';
import Results from './Results';
import ResultsToolbar from './ResultsToolbar';
import styles from './styles/ResultsWrapper.module.css';
import ToolbarWrapper from './ToolbarWrapper';
import GrpcUrlWindow from './GrpcUrlWindow';
import { formatGrpcUrl, copyToClipboard } from './grpcUrlHelpers';

export default function EditorToolbar() {
    const {
        response,
        executeRequest,
        isLoadingRequest,
        selectedServer,
        selectedService,
        selectedMethod,
        metadata,
        requestText,
    } = useContext(RecessContext);

    const [grpcUrlPopupToggle, setGrpcUrlPopupToggle] = useState(false);
    const [message, setMessage] = useState('');
    const areActionsDisabled =
        selectedServer === null || selectedService === null || grpcUrlPopupToggle;

    function handleGrpcUrlClick() {
        const grpcUrl = formatGrpcUrl(
            selectedServer,
            selectedService,
            selectedMethod,
            metadata,
            requestText
        );
        setMessage(grpcUrl);
        copyToClipboard(grpcUrl);
        setGrpcUrlPopupToggle(true);
    }

    return (
        <div className={styles.wrapper}>
            <PlayButton
                title="Execute Query (Ctrl-Enter)"
                onClick={executeRequest}
                className={classNames(styles.play, {
                    [styles.isLoading]: isLoadingRequest,
                })}
                disabled={areActionsDisabled}
            />
            <button
                className={styles.copy}
                onClick={() => handleGrpcUrlClick()}
                disabled={areActionsDisabled}
            >
                Copy as gRPCurl
            </button>
            <GrpcUrlWindow
                onCloseClick={() => setGrpcUrlPopupToggle(false)}
                isVisible={grpcUrlPopupToggle}
                message={message}
            />
            <ToolbarWrapper
                toolbar={
                    <ResultsToolbar
                        grpcRequestTime={response ? response.grpcRequestTime : null}
                        protoMessageSize={response ? response.protoMessageSize : null}
                    />
                }
            >
                <Results
                    response={response ? response.response : null}
                    error={response ? response.error : false}
                />
            </ToolbarWrapper>
        </div>
    );
}
