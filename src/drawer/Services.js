import React, { useContext } from 'react';
import { RecessContext } from '../RecessContext';
import Service from './Service';
import SectionTitle from './SectionTitle';
import { ReactComponent as ReloadIcon } from '../icons/reload.svg';

import styles from './styles/Services.module.css';
import { getMatchingServices } from '../MatchingServiceDataHelper';

export default function Servers() {
    const { serverData, reloadServerData, methodSearchText } = useContext(RecessContext);
    const matchingServiceData = getMatchingServices(serverData, methodSearchText)
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Services"
                onClickAction={reloadServerData}
                ActionIcon={ReloadIcon}
            />
            {matchingServiceData.map(service => (
                <Service key={service.serviceName} service={service} />
            ))}
        </div>
    );
}
