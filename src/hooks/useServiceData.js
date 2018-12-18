import { useState, useEffect } from 'react';
import { fetchServerInfo } from '../api';

function includesService(serverData, service) {
    return !!serverData.find(({ serviceName }) => serviceName === service);
}

function includesMethod(service, method) {
    return !!(service.methods || []).find(({ name }) => name === method);
}

export default function useServiceData({
    selectedService,
    selectService,
    selectedMethod,
    selectMethod,
    selectedServer,
}) {
    const [serverData, setServerData] = useState([]);
    const [serverDataIsLoading, setServerDataIsLoading] = useState(true);
    const [serverFetchError, setServerFetchError] = useState(null);

    async function fetchServerData() {
        if (selectedServer) {
            setServerDataIsLoading(true);
            try {
                const newServerData = await fetchServerInfo(selectedServer);
                setServerData(newServerData);
                if (!selectedService || !includesService(newServerData, selectedServer)) {
                    selectService(newServerData[0]);
                    selectMethod(newServerData[0].methods[0]);
                } else if (!includesMethod(serverData, selectedServer, selectedMethod)) {
                    selectMethod(selectedService.methods[0]);
                }
                setServerDataIsLoading(false);
                setServerFetchError(null);
            } catch (e) {
                setServerDataIsLoading(false);
                setServerData([]);
                selectService(null);
                selectMethod(null);
                setServerFetchError(
                    `Could not fetch server data for ${selectedServer.name}:${selectedServer.port}`
                );
            }
        }
    }

    useEffect(
        () => {
            fetchServerData();
        },
        [selectedServer]
    );

    return {
        serverDataIsLoading,
        serverData,
        serverFetchError,
        fetchServerData,
    };
}
