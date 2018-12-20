import React, { useContext } from 'react';
import { RecessContext } from '../RecessContext';
import Service from './Service';
import SectionTitle from './SectionTitle';
import { ReactComponent as ReloadIcon } from '../icons/reload.svg';

import styles from './styles/Services.module.css';

export default function Servers() {
    const { serverData, reloadServerData } = useContext(RecessContext);
    return (
        <div className={styles.wrapper}>
            <SectionTitle
                title="Services"
                onClickAction={reloadServerData}
                ActionIcon={ReloadIcon}
            />
            {(serverData || []).map(service => (
                <Service key={service.serviceName} service={service} />
            ))}
        </div>
    );
}
