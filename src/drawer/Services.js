import React, { useContext } from 'react';
import { RecessContext } from '../RecessContext';
import Service from './Service';
import Table from './Table';

export default function Servers() {
    const { serverData } = useContext(RecessContext);
    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th>Services</th>
                    </tr>
                    {serverData.map(service => (
                        <Service key={service.serviceName} service={service} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
