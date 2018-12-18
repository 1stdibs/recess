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

export function RecessContextManager({ children }) {
    const [servers, setServers] = useState(initialServers);
    const [selectedServer, selectServer] = useState(initialServers[0]);
    const [serverData, setServerData] = useState({});
    const [serverDataIsLoading, setServerDataIsLoading] = useState(true);
    const [serverFetchError, setServerFetchError] = useState(null);

    useEffect(
        () => {
            (async function() {
                if (selectServer) {
                    setServerDataIsLoading(true);
                    try {
                        const newServerData = await fetchServerInfo(selectedServer);
                        setServerData(newServerData);
                        setServerDataIsLoading(false);
                        setServerFetchError(null);
                    } catch (e) {
                        setServerDataIsLoading(false);
                        setServerFetchError(
                            `Could not fetch server data for ${selectServer.name}:${
                                selectServer.port
                            }`
                        );
                    }
                }
            })();
        },
        [selectedServer]
    );

    return (
        <RecessContext.Provider
            value={{
                servers,
                selectedServer,
                selectServer,
                addServer: ({ name, port }) =>
                    setServers(currentServers => [...currentServers, { name, port }]),
                deleteServer: serverToDelete =>
                    setServers(currentServers => {
                        return currentServers.filter(
                            ({ name, port }) =>
                                !(name === serverToDelete.name && port === serverToDelete.port)
                        );
                    }),
            }}
        >
            {children}
        </RecessContext.Provider>
    );
}
