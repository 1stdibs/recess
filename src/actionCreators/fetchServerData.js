import { fetchServerInfo } from '../api';
import { LOADING_SERVER_DATA, LOADED_SERVER_DATA, ERROR_LOADING_SERVER_DATA } from '../reducer';

export default async function fetchServerData(selectedServer, dispatch) {
    if (selectedServer) {
        dispatch({ type: LOADING_SERVER_DATA });
        try {
            const serverData = await fetchServerInfo(selectedServer);
            dispatch({ type: LOADED_SERVER_DATA, serverData });
        } catch (e) {
            dispatch({
                type: ERROR_LOADING_SERVER_DATA,
                error: `Could not fetch server data for ${selectedServer.name}:${
                    selectedServer.port
                }`,
            });
        }
    }
}
