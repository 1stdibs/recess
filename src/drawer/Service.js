import React, { useState, useContext } from 'react';
import { RecessContext } from '../RecessContext';
import Table from './Table';
import ClickableRow from './ClickableRow';
import styles from './styles/Service.module.css';

export default function Service({ service }) {
    const { selectedService, selectedMethod, selectMethod } = useContext(RecessContext);
    const [isExpanded, setIsExpanded] = useState(
        selectedService.serviceName === service.serviceName
    );
    const icon = isExpanded ? '-' : '+';
    return (
        <tr>
            <td onClick={() => setIsExpanded(state => !state)}>
                <div className={styles.name}>
                    {icon} {service.serviceName}
                </div>
                {isExpanded && (
                    <Table>
                        <tbody>
                            {(service.methods || []).map(method => (
                                <ClickableRow
                                    key={method.name}
                                    onClick={e => {
                                        e.stopPropagation();
                                        selectMethod(service, method);
                                    }}
                                    isSelected={
                                        selectedMethod.name === method.name &&
                                        selectedService.serviceName === service.serviceName
                                    }
                                >
                                    <span className={styles.indent}>{method.name}</span>
                                </ClickableRow>
                            ))}
                        </tbody>
                    </Table>
                )}
            </td>
        </tr>
    );
}
