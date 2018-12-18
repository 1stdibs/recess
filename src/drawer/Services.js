import React, { useContext } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import Table from './Table';

export default function Servers() {
    const { serverData, selectedService, selectService } = useContext(RecessContext);
    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th>Services</th>
                    </tr>
                    {serverData.map(service => (
                        <ClickableRow
                            key={service.serviceName}
                            onClick={() => {
                                selectService(service);
                            }}
                            isSelected={selectedService.serviceName === service.serviceName}
                        >
                            {service.serviceName}
                        </ClickableRow>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
