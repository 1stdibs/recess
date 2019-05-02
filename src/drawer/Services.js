import React, { useContext } from 'react';
import classNames from 'classnames';
import { RecessContext } from '../RecessContext';
import Service from './Service';
import SectionTitle from './SectionTitle';
import { ReactComponent as ReloadIcon } from '../icons/reload.svg';

import styles from './styles/Services.module.css';
import { getMatchingServices } from '../MatchingServiceDataHelper';

export default function Servers() {
    const {
        serverData,
        serverDataError,
        reloadServerData,
        isLoadingServerData,
        methodSearchText,
    } = useContext(RecessContext);
    const matchingServiceData = getMatchingServices(serverData, methodSearchText);
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Services"
                action={
                    <ReloadIcon
                        className={classNames({ [styles.isLoading]: isLoadingServerData })}
                        onClick={reloadServerData}
                    />
                }
                onClickAction={reloadServerData}
                ActionIcon={ReloadIcon}
            />
            {!!serverDataError ? (
                <div className={styles.textWrapper}>{serverDataError}</div>
            ) : (
                matchingServiceData.map(service => (
                    <Service key={service.serviceName} service={service} />
                ))
            )}
        </div>
    );
}
