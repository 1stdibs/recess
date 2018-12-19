import React, { useState } from 'react';
import useServiceData from './hooks/useServiceData';
import useRequestData from './hooks/useRequestData';

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

    const { requestText, responseText, setRequestText, execute } = useRequestData({
        selectedServer,
        selectedMethod,
        selectedService,
    });

    const value = {
        serverData,
        serverDataIsLoading,
        serverFetchError,
        servers,
        selectedServer,
        selectServer,
        selectedService,
        selectedMethod,
        selectMethod: (service, method) => {
            selectService(service);
            selectMethod(method);
        },
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
        requestText,
        responseText,
        setRequestText,
        execute,
    };

    console.log(value);

    return <RecessContext.Provider value={value}>{children}</RecessContext.Provider>;
}
