import React, { useContext } from 'react';
import { RecessContext } from '../RecessContext';
import ClickableRow from './ClickableRow';
import Table from './Table';

export default function Servers() {
    const { selectedService, selectedMethod, selectMethod } = useContext(RecessContext);
    return (
        <div>
            <Table>
                <tbody>
                    <tr>
                        <th>Methods</th>
                    </tr>
                    {selectedService ? (
                        (selectedService.methods || []).map(method => (
                            <ClickableRow
                                key={method.name}
                                onClick={() => {
                                    selectMethod(method);
                                }}
                                isSelected={selectedMethod.name === method.name}
                            >
                                {method.name}
                            </ClickableRow>
                        ))
                    ) : (
                        <tr>
                            <td>Select a service</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
