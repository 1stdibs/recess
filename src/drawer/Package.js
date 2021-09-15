import React, { useState, useContext } from 'react';
import { RecessContext } from '../RecessContext';
import { ReactComponent as ClosedIcon } from '../icons/dropdown-closed.svg';
import { ReactComponent as OpenIcon } from '../icons/dropdown-open.svg';
import Service from './Service';

import styles from './styles/Package.module.css';

export default function Package({ pkg, services }) {
    const { selectedService } = useContext(RecessContext);
    const [isExpanded, setIsExpanded] = useState(
        !!selectedService && selectedService.name.startsWith(`${pkg}.`)
    );
    const icon = !isExpanded ? (
        <OpenIcon className={styles.icon} />
    ) : (
        <ClosedIcon className={styles.icon} />
    );

    return (
        <div className={styles.wrapper} onClick={() => setIsExpanded((state) => !state)}>
            <div className={styles.name}>
                {icon} {pkg}
            </div>
            {isExpanded && (
                <div className={styles.methods}>
                    {services.map((service) => (
                        <Service key={service.name} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
}
