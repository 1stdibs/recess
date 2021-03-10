import classNames from 'classnames';
import React, { useContext } from 'react';
import { ReactComponent as PlayButton } from './icons/play.svg';
import { RecessContext } from './RecessContext';
import Results from './Results';
import ResultsToolbar from './ResultsToolbar';
import styles from './styles/ResultsWrapper.module.css';
import ToolbarWrapper from './ToolbarWrapper';

export default function EditorToolbar() {
    const {
        response,
        executeRequest,
        isLoadingRequest,
        selectedServer,
        selectedService,
    } = useContext(RecessContext);

    const isPlayDisabled = selectedServer === null || selectedService === null;

    return (
        <div className={styles.wrapper}>
            <PlayButton
                title="Execute Query (Ctrl-Enter)"
                onClick={executeRequest}
                className={classNames(styles.play, {
                    [styles.isLoading]: isLoadingRequest,
                })}
                disabled={isPlayDisabled}
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
