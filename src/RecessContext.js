import React, { useReducer, useEffect } from 'react';
import fetchServerData from './actionCreators/fetchServerData';
import fetchAutoCompleteData from './actionCreators/fetchAutoCompleteData';
import executeRequest from './actionCreators/executeRequest';
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
} from './reducer';

export const RecessContext = React.createContext();

export function RecessContextManager({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        ...JSON.parse(localStorage.getItem('recessState')),
    });

    useEffect(
        () => {
            fetchServerData(state.selectedServer, dispatch);
        },
        [state.selectedServer]
    );

    const selectedServer = state.selectedServer || {};
    const service = state.service || {};
    const method = state.method || {};

    useEffect(
        () => {
            fetchAutoCompleteData({
                name: selectedServer.name,
                port: selectedServer.port,
                serviceName: service.serviceName,
                methodName: method.name,
                useCamelCase: state.useCamelCase,
                dispatch,
            });
        },
        [
            selectedServer.name,
            selectedServer.port,
            service.serviceName,
            method.name,
            state.useCamelCase,
        ]
    );

    useEffect(
        () => {
            localStorage.setItem(
                'recessState',
                JSON.stringify({
                    ...state,
                    // don't store data fetched from back end
                    serverData: [],
                    autoCompleteData: null,
                    response: null,
                })
            );
        },
        [state]
    );

    const value = {
        serverData: state.serverData,
        isLoadingServerData: state.isLoadingServerData,
        serverDataError: state.serverDataError,
        servers: state.servers,
        selectedServer: state.selectedServer,
        selectServer: server => dispatch({ type: SELECT_SERVER, server }),
        selectedService: state.service,
        selectedMethod: state.method,
        selectMethod: (service, method) => dispatch({ type: SELECT_METHOD, service, method }),
        reloadServerData: () => fetchServerData(state.selectedServer, dispatch),
        addServer: ({ name, port }) => dispatch({ type: ADD_SERVER, name, port }),
        deleteServer: i => dispatch({ type: DELETE_SERVER, i }),
        requestText: state.requestText,
        response: state.response,
        setRequestText: requestText => dispatch({ type: EDIT_REQUEST, requestText }),
        executeRequest: () => executeRequest(state, dispatch),
        metadata: state.metadata,
        addMetadata: ({ key, value }) => dispatch({ type: ADD_METADATA, key, value }),
        deleteMetadata: ({ key }) => dispatch({ type: DELETE_METADATA, key }),
        autoCompleteData: state.autoCompleteData,
        useCamelCase: state.useCamelCase,
        setCamelCase: useCamelCase => dispatch({ type: USE_CAMEL_CASE, useCamelCase }),
        formatRequest: () => {
            try {
                const newRequestText = JSON.stringify(JSON.parse(state.requestText), null, 2);
                dispatch({ type: EDIT_REQUEST, requestText: newRequestText });
            } catch (e) {
                // do nothing
            }
        },
    };

    console.log(value);

    return <RecessContext.Provider value={value}>{children}</RecessContext.Provider>;
}
