import React, { useState, useContext } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import { ReactComponent as ClosedIcon } from '../icons/dropdown-closed.svg';
import { ReactComponent as OpenIcon } from '../icons/dropdown-open.svg';
import classNames from 'classnames';

import styles from './styles/Service.module.css';

export default function Service({ service }) {
    const { selectedService, selectedMethod, selectMethod, setRequestText, methodSearchText } = useContext(RecessContext);
    const [isExpanded, setIsExpanded] = useState(
        !!selectedService && selectedService.serviceName === service.serviceName
    );
    const icon = !isExpanded ? (
        <OpenIcon className={styles.icon} />
    ) : (
        <ClosedIcon className={styles.icon} />
    );

    let serviceContainsSearchMatch = false;
    (service.methods || []).forEach(method => {
        if (methodSearchText === "" || method.name.toLowerCase().includes(methodSearchText.toLowerCase())) {
            serviceContainsSearchMatch = true;
        }
    });

    return (
        <div className={styles.wrapper} onClick={() => setIsExpanded(state => !state)}>
            <div className={classNames(styles.name, { [styles.isGreyed]: !serviceContainsSearchMatch })}>
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
                            isGreyed={
                                methodSearchText !== "" &&
                                !method.name.toLowerCase().includes(methodSearchText.toLowerCase())
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
