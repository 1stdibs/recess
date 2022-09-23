import {
    EDIT_HISTORY_SEARCH,
    ADD_SERVER,
    DELETE_HISTORY,
    SELECT_SERVER,
    DELETE_ALL_HISTORY,
    EDIT_HISTORY_VISIBLE,
} from '../reducer';
import fetchServerData from './fetchServerData';

export function deleteHistoryEntry({ dispatch, entryId }) {
    dispatch({ type: DELETE_HISTORY, entryId });
}

export function selectHistory({ store, dispatch, entry }) {
    const state = store.getState();
    const { name: serverName, port } = entry.server;
    const foundServer = state.servers.find(
        (server) => server.name === serverName && server.port === port
    );
    if (!foundServer) {
        dispatch({ type: ADD_SERVER, name: serverName, port });
    }
    dispatch({ type: SELECT_SERVER, server: entry.server });

    fetchServerData({
        selectedServer: entry.server,
        useCamelCase: state.useCamelCase,
        dispatch,
        newService: { name: entry.serviceName },
        newMethod: { name: entry.methodName },
        requestText: entry.requestText,
        metadata: entry.metadata,
    });
}

export function setHistorySearchText({ dispatch, searchText }) {
    dispatch({ type: EDIT_HISTORY_SEARCH, searchText });
}

export function clearAllHistory({ dispatch }) {
    dispatch({ type: DELETE_ALL_HISTORY });
}

export function setHistoryVisible({ dispatch, historyVisible }) {
    dispatch({ type: EDIT_HISTORY_VISIBLE, historyVisible });
}
