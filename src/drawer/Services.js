import React from 'react';
import classNames from 'classnames';
import Package from './Package';
import SectionTitle from './SectionTitle';
import { ReactComponent as ReloadIcon } from '../icons/reload.svg';

import styles from './styles/Services.module.css';
import { getMatchingServices } from '../MatchingServiceDataHelper';
import { useDispatch, useSelector } from 'react-redux';
import { reloadServerData } from '../actionCreators/servicesActions';

export default function Services() {
    const dispatch = useDispatch();
    const selectedServer = useSelector((state) => state.selectedServer);
    const useCamelCase = useSelector((state) => state.useCamelCase);
    const serverData = useSelector((state) => state.serverData);
    const serverDataError = useSelector((state) => state.serverDataError);
    const isLoadingServerData = useSelector((state) => state.isLoadingServerData);
    const methodSearchText = useSelector((state) => state.methodSearchText);
    const matchingServiceData = getMatchingServices(serverData, methodSearchText);
    const pkgs = new Set();
    for (const service of matchingServiceData) {
        const [pkg] = service.name.split('.');
        pkgs.add(pkg);
    }
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Services"
                action={
                    <ReloadIcon
                        className={classNames({ [styles.isLoading]: isLoadingServerData })}
                        onClick={() => reloadServerData({ dispatch, selectedServer, useCamelCase })}
                    />
                }
            />
            {!!serverDataError ? (
                <div className={styles.textWrapper}>{serverDataError}</div>
            ) : (
                [...pkgs]
                    .sort()
                    .map((pkg) => (
                        <Package
                            key={pkg}
                            pkg={pkg}
                            services={matchingServiceData.filter(({ name }) =>
                                name.startsWith(`${pkg}.`)
                            )}
                        />
                    ))
            )}
        </div>
    );
}
