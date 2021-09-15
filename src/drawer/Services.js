import React, { useContext } from 'react';
import classNames from 'classnames';
import { RecessContext } from '../RecessContext';
import Package from './Package';
import SectionTitle from './SectionTitle';
import { ReactComponent as ReloadIcon } from '../icons/reload.svg';

import styles from './styles/Services.module.css';
import { getMatchingServices } from '../MatchingServiceDataHelper';

export default function Services() {
    const { serverData, serverDataError, reloadServerData, isLoadingServerData, methodSearchText } =
        useContext(RecessContext);
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
                        onClick={reloadServerData}
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
