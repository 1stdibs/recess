import classNames from 'classnames';
import React, { useContext } from 'react';
import { ReactComponent as PlayButton } from './icons/play.svg';
import { RecessContext } from './RecessContext';
import Results from './Results';
import ResultsToolbar from './ResultsToolbar';
import styles from './styles/ResultsWrapper.module.css';
import ToolbarWrapper from './ToolbarWrapper';
import Toast from './Toast';
import copyGrpcurlToClipboard from './exportAsGrpcurl';

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
        servers,
        serverData,
    } = useContext(RecessContext);

    const [toastToggle, setToastToggle] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const disableButtons = selectedServer==null || selectedService==null || toastToggle; 
    
    function handleGrpcurlClick() {
        var grpcurl = copyGrpcurlToClipboard(selectedServer, selectedService, selectedMethod, metadata, requestText, servers, serverData);
        setToastToggle(true);
        setMessage(grpcurl);
    }

    return (
        <div className={styles.wrapper}>
            <PlayButton
                title="Execute Query (Ctrl-Enter)"
                onClick={executeRequest}
                className={classNames(styles.play, {
                    [styles.isLoading]: isLoadingRequest,
                })}
                disabled={disableButtons}
            />

            <button
                className={styles.copy}
                onClick={() => handleGrpcurlClick()}
                disabled={disableButtons}>
                Copy as gRPCurl
            </button>

            <Toast
                onCloseClick={() => setToastToggle(false)}
                isVisible={toastToggle}
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
