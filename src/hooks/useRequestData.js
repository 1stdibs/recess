import { useState } from 'react';
import { invokeRPC } from '../api';

export default function({ selectedServer, selectedService, selectedMethod }) {
    const [isRequestLoading, setIsLoading] = useState(false);
    const [requestText, setRequestText] = useState('');
    const [responseText, setResponseText] = useState('');

    async function execute() {
        setIsLoading(true);
        try {
            const response = await invokeRPC({
                ...selectedServer,
                service: selectedService.serviceName,
                method: selectedMethod.name,
                requestText,
            });
            setIsLoading(false);
            setResponseText(response);
        } catch (e) {
            setIsLoading(false);
            setResponseText(e.toString());
        }
    }

    return {
        requestText,
        responseText,
        setRequestText,
        execute,
    };
}
