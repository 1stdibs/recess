import { useState } from 'react';
import { invokeRPC } from '../api';

export default function({ selectedServer, selectedService, selectedMethod }) {
    const [requestText, setRequestText] = useState('');
    const [responseText, setResponseText] = useState('');

    async function execute() {
        const response = await invokeRPC({
            ...selectedServer,
            service: selectedService.serviceName,
            method: selectedMethod.name,
            body: requestText,
        });
        setResponseText(response);
    }

    return {
        requestText,
        responseText,
        setRequestText,
        execute,
    };
}
