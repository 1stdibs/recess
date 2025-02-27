import React, { useReducer, useEffect, useCallback, useState } from 'react';
import fetchServerData from './actionCreators/fetchServerData';
import executeRequest from './actionCreators/executeRequest';
import getMock from './getMock';
import reducer, {
    initialState,
    SELECT_SERVER,
    SELECT_METHOD,
    ADD_SERVER,
    DELETE_SERVER,
    EDIT_REQUEST,
    ADD_METADATA,
    DELETE_METADATA,
    USE_CAMEL_CASE,
    EDIT_METHOD_SEARCH,
    VIEW_PARSED,
    DELETE_HISTORY,
    EDIT_HISTORY_SEARCH,
    DELETE_ALL_HISTORY,
    EDIT_HISTORY_VISIBLE,
} from './reducer';

export const RecessContext = React.createContext();

export function RecessContextManager({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        ...JSON.parse(localStorage.getItem('recessState')),
    });

    useEffect(() => {
        const abortController = new AbortController();
        fetchServerData({
            selectedServer: state.selectedServer,
            useCamelCase: state.useCamelCase,
            dispatch,
            signal: abortController.signal,
        });
        return () => {
            abortController.abort();
        };
    }, [state.selectedServer, state.useCamelCase]);

    useEffect(() => {
        localStorage.setItem(
            'recessState',
            JSON.stringify({
                ...state,
                // don't store data fetched from back end
                serverData: null,
                response: null,
                requestAbortController: null,
            })
        );
    }, [state]);

    const selectServer = useCallback((server) => dispatch({ type: SELECT_SERVER, server }), []);

    const selectMethod = useCallback(
        (service, method) => dispatch({ type: SELECT_METHOD, service, method }),
        []
    );

    const reloadServerData = useCallback(
        () =>
            fetchServerData({
                selectedServer: state.selectedServer,
                useCamelCase: state.useCamelCase,
                dispatch,
            }),
        [state.selectedServer, state.useCamelCase]
    );

    const addServer = useCallback(
        ({ name, port, ssl }) => dispatch({ type: ADD_SERVER, name, port, ssl }),
        []
    );

    const deleteServer = useCallback((i) => dispatch({ type: DELETE_SERVER, i }), [dispatch]);
    const setRequestText = useCallback(
        (requestText) => dispatch({ type: EDIT_REQUEST, requestText }),
        []
    );

    const addMetadata = useCallback(
        ({ key, value }) => dispatch({ type: ADD_METADATA, key, value }),
        []
    );

    const deleteMetadata = useCallback(({ key }) => dispatch({ type: DELETE_METADATA, key }), []);

    const setCamelCase = useCallback(
        (useCamelCase) => dispatch({ type: USE_CAMEL_CASE, useCamelCase }),
        []
    );

    const formatRequest = useCallback(() => {
        try {
            const newRequestText = JSON.stringify(JSON.parse(state.requestText), null, 2);
            dispatch({ type: EDIT_REQUEST, requestText: newRequestText });
        } catch (e) {
            // do nothing
        }
    }, [state.requestText]);

    const inputType = state.method?.inputType;
    const types = state.serverData?.types;

    const insertMock = useCallback(() => {
        dispatch({
            type: EDIT_REQUEST,
            requestText: JSON.stringify(getMock({ inputType, types }), null, 2),
        });
    }, [inputType, types]);

    const setMethodSearchText = useCallback(
        (searchText) => dispatch({ type: EDIT_METHOD_SEARCH, searchText }),
        [dispatch]
    );

    const setViewParsed = useCallback(
        (viewParsed) => dispatch({ type: VIEW_PARSED, viewParsed }),
        []
    );

    const deleteHistoryEntry = useCallback(
        (entryId) => dispatch({ type: DELETE_HISTORY, entryId }),
        []
    );

    const selectHistory = useCallback(
        (entry) => {
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
        },
        [state.servers, state.useCamelCase]
    );

    const setHistorySearchText = useCallback(
        (searchText) => dispatch({ type: EDIT_HISTORY_SEARCH, searchText }),
        []
    );

    const clearAllHistory = useCallback(() => dispatch({ type: DELETE_ALL_HISTORY }), []);

    const setHistoryVisible = useCallback(
        (historyVisible) => dispatch({ type: EDIT_HISTORY_VISIBLE, historyVisible }),
        []
    );

    const [popupOrder, setPopupOrder] = useState([]);

    const onPopupFocus = useCallback(
        (popupRef) => {
            if (!popupRef || popupOrder[0] === popupRef) return;

            setPopupOrder((prev) => {
                const popupOrderCopy = [...prev];
                const targetIndex = popupOrderCopy.indexOf(popupRef);
                if (targetIndex !== -1) {
                    popupOrderCopy.splice(targetIndex, 1);
                }
                popupOrderCopy.unshift(popupRef);
                return popupOrderCopy;
            });
        },
        [popupOrder]
    );

    const getPopupOrder = useCallback(
        (popupRef) => {
            const order = popupOrder.indexOf(popupRef);
            return order >= 0 ? order : undefined;
        },
        [popupOrder]
    );

    const value = {
        serverData: state.serverData,
        isLoadingServerData: state.isLoadingServerData,
        serverDataError: state.serverDataError,
        servers: state.servers,
        selectedServer: state.selectedServer,
        selectServer,
        selectedService: state.service,
        selectedMethod: state.method,
        selectMethod,
        reloadServerData,
        addServer,
        deleteServer,
        requestText: state.requestText,
        response: state.response,
        setRequestText,
        isLoadingRequest: state.isLoadingRequest,
        executeRequest: () => executeRequest(state, dispatch),
        metadata: state.metadata,
        addMetadata,
        deleteMetadata,
        useCamelCase: state.useCamelCase,
        setCamelCase,
        formatRequest,
        insertMock,
        setMethodSearchText,
        methodSearchText: state.methodSearchText,
        viewParsed: state.viewParsed,
        setViewParsed,
        history: state.history,
        deleteHistoryEntry,
        selectHistory,
        historySearchText: state.historySearchText,
        setHistorySearchText,
        clearAllHistory,
        setHistoryVisible,
        historyVisible: state.historyVisible,
        onPopupFocus,
        getPopupOrder,
    };

    return <RecessContext.Provider value={value}>{children}</RecessContext.Provider>;
}
