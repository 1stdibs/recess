import React, { useState, useContext } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import { ReactComponent as ClosedIcon } from '../icons/dropdown-closed.svg';
import { ReactComponent as OpenIcon } from '../icons/dropdown-open.svg';

import styles from './styles/Service.module.css';
import { getMatchingMethods } from '../MatchingServiceDataHelper';

export default function Service({ service }) {
    const { selectedService, selectedMethod, selectMethod, methodSearchText } =
        useContext(RecessContext);
    const [isExpanded, setIsExpanded] = useState(
        !!selectedService && selectedService.name === service.name
    );
    const icon = !isExpanded ? (
        <OpenIcon className={styles.icon} />
    ) : (
        <ClosedIcon className={styles.icon} />
    );
    const matchingMethods = getMatchingMethods(service, methodSearchText);

    return (
        <div
            className={styles.wrapper}
            onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((state) => !state);
            }}
        >
            <div className={styles.name}>
                {icon} {service.name.split('.')[1]}
            </div>
            {isExpanded && (
                <div className={styles.methods}>
                    {matchingMethods.map((method) => (
                        <ClickableRow
                            key={method.name}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectMethod(service, method);
                            }}
                            isSelected={
                                !!selectedService &&
                                selectedMethod.name === method.name &&
                                selectedService.name === service.name
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
