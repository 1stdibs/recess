import React, { useContext } from 'react';
import classNames from 'classnames';
import { RecessContext } from './RecessContext';
import ResultsToolbar from './ResultsToolbar';
import Results from './Results';
import ToolbarWrapper from './ToolbarWrapper';
import { ReactComponent as PlayButton } from './icons/play.svg';

import styles from './styles/ResultsWrapper.module.css';

export default function EditorToolbar() {
    const { response, executeRequest, isLoadingRequest } = useContext(RecessContext);
    return (
        <div className={styles.wrapper}>
            <PlayButton
                title="Execute Query (Ctrl-Enter)"
                onClick={executeRequest}
                className={classNames(styles.play, {
                    [styles.isLoading]: isLoadingRequest,
                })}
            />

            <ToolbarWrapper
                toolbar={
                    <ResultsToolbar
                        grpcRequestTime={response ? response.grpcRequestTime : null}
                        protoMessageSize={response ? response.protoMessageSize : null}
                    />
                }
            >
                <Results response={response ? response.response : null} />
            </ToolbarWrapper>
        </div>
    );
}
