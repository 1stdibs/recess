import React, { useState, useEffect } from 'react';
import { fetchServerInfo } from './api';
export const RecessContext = React.createContext();
const initialServers = [
    {
        name: 'oathkeeper',
        port: '50051',
    },
    {
        name: 'longclaw',
        port: '50051',
    },
];

function includesService(serverData, service) {
    return !!serverData.find(({ serviceName }) => serviceName === service);
}

function includesMethod(service, method) {
    return !!(service.methods || []).find(({ name }) => name === method);
}

function useServiceData({
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

export function RecessContextManager({ children }) {
    const [servers, setServers] = useState(initialServers);
    const [selectedServer, selectServer] = useState(initialServers[0]);
    const [selectedService, selectService] = useState(null);
    const [selectedMethod, selectMethod] = useState(null);

    const { serverDataIsLoading, serverData, serverFetchError, fetchServerData } = useServiceData({
        selectedService,
        selectService,
        selectedServer,
        selectedMethod,
        selectMethod,
    });

    const value = {
        serverData,
        serverDataIsLoading,
        serverFetchError,
        servers,
        selectedServer,
        selectServer,
        selectedService,
        selectService: service => {
            selectService(service);
            selectMethod(service.methods[0]);
        },
        selectedMethod,
        selectMethod,
        reloadServerData: fetchServerData,
        addServer: ({ name, port }) =>
            setServers(currentServers => [...currentServers, { name, port }]),
        deleteServer: serverToDelete =>
            setServers(currentServers => {
                return currentServers.filter(
                    ({ name, port }) =>
                        !(name === serverToDelete.name && port === serverToDelete.port)
                );
            }),
    };

    console.log(value);

    return <RecessContext.Provider value={value}>{children}</RecessContext.Provider>;
}
