import React, { useState, useContext } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import { ReactComponent as ClosedIcon } from '../icons/dropdown-closed.svg';
import { ReactComponent as OpenIcon } from '../icons/dropdown-open.svg';

import styles from './styles/Service.module.css';

export default function Service({ service }) {
    const { selectedService, selectedMethod, selectMethod, setRequestText } = useContext(RecessContext);
    const [isExpanded, setIsExpanded] = useState(
        !!selectedService && selectedService.serviceName === service.serviceName
    );
    const icon = isExpanded ? (
        <OpenIcon className={styles.icon} />
    ) : (
        <ClosedIcon className={styles.icon} />
    );
    return (
        <div className={styles.wrapper} onClick={() => setIsExpanded(state => !state)}>
            <div className={styles.name}>
                {icon} {service.serviceName}
            </div>
            {isExpanded && (
                <div className={styles.methods}>
                    {(service.methods || []).map(method => (
                        <ClickableRow
                            key={method.name}
                            onClick={e => {
                                e.stopPropagation();
                                selectMethod(service, method);
                            }}
                            isSelected={
                                !!selectedService &&
                                selectedMethod.name === method.name &&
                                selectedService.serviceName === service.serviceName
                            }
                        >
                            <span className={styles.indent}>{method.name}</span>
                        </ClickableRow>
                    ))}
                </div>
            )}
        </div>
    );
}
