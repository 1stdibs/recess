import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import executeRequest from './actionCreators/executeRequest';
import { ReactComponent as PlayButton } from './icons/play.svg';
import Results from './Results';
import ResultsToolbar from './ResultsToolbar';
import styles from './styles/ResultsWrapper.module.css';
import ToolbarWrapper from './ToolbarWrapper';

export default function EditorToolbar() {
    const dispatch = useDispatch();
    const store = useStore();
    const response = useSelector((state) => state.response);
    const isLoadingRequest = useSelector((state) => state.isLoadingRequest);
    const selectedServer = useSelector((state) => state.selectedServer);
    const selectedService = useSelector((state) => state.selectedService);

    const isPlayDisabled = selectedServer === null || selectedService === null;

    return (
        <div className={styles.wrapper}>
            <PlayButton
                title="Execute Query (Ctrl-Enter)"
                onClick={() => executeRequest(store, dispatch)}
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
