import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClickableRow from './ClickableRow';
import { ReactComponent as ClosedIcon } from '../icons/dropdown-closed.svg';
import { ReactComponent as OpenIcon } from '../icons/dropdown-open.svg';

import styles from './styles/Service.module.css';
import { getMatchingMethods } from '../MatchingServiceDataHelper';
import { selectMethod } from '../actionCreators/servicesActions';

export default function Service({ service }) {
    const dispatch = useDispatch();
    const selectedService = useSelector((state) => state.selectedService);
    const selectedMethod = useSelector((state) => state.selectedMethod);
    const methodSearchText = useSelector((state) => state.methodSearchText);
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
                                selectMethod({ dispatch, service, method });
                            }}
                            isSelected={
                                !!selectedService &&
                                !!selectedMethod &&
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
