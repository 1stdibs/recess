import { fetchServerInfo } from '../api';
import { LOADING_SERVER_DATA, LOADED_SERVER_DATA, ERROR_LOADING_SERVER_DATA } from '../reducer';

export default async function fetchServerData({
    selectedServer,
    useCamelCase,
    dispatch,
    newService,
    newMethod,
    requestText,
    metadata,
}) {
    if (selectedServer) {
        dispatch({ type: LOADING_SERVER_DATA });
        try {
            const serverData = await fetchServerInfo({
                name: selectedServer.name,
                port: selectedServer.port,
                useCamelCase,
            });

            if (!Array.isArray(serverData.services)) {
                dispatch({
                    type: ERROR_LOADING_SERVER_DATA,
                    error: `Could not fetch server data for ${selectedServer.name}:${selectedServer.port}`,
                });
            } else {
                dispatch({
                    type: LOADED_SERVER_DATA,
                    serverData,
                    newService,
                    newMethod,
                    requestText,
                    metadata,
                });
            }
        } catch (e) {
            dispatch({
                type: ERROR_LOADING_SERVER_DATA,
                error: `Could not fetch server data for ${selectedServer.name}:${selectedServer.port}`,
            });
        }
    }
}
