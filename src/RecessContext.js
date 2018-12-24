import React, { useReducer, useEffect } from 'react';
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
} from './reducer';

export const RecessContext = React.createContext();

export function RecessContextManager({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        ...JSON.parse(localStorage.getItem('recessState')),
    });

    useEffect(
        () => {
            fetchServerData(state.selectedServer, state.useCamelCase, dispatch);
        },
        [state.selectedServer, state.useCamelCase]
    );

    useEffect(
        () => {
            localStorage.setItem(
                'recessState',
                JSON.stringify({
                    ...state,
                    // don't store data fetched from back end
                    serverData: [],
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
        reloadServerData: () => fetchServerData(state.selectedServer, state.useCamelCase, dispatch),
        addServer: ({ name, port }) => dispatch({ type: ADD_SERVER, name, port }),
        deleteServer: i => dispatch({ type: DELETE_SERVER, i }),
        requestText: state.requestText,
        response: state.response,
        setRequestText: requestText => dispatch({ type: EDIT_REQUEST, requestText }),
        isLoadingRequest: state.isLoadingRequest,
        executeRequest: () => executeRequest(state, dispatch),
        metadata: state.metadata,
        addMetadata: ({ key, value }) => dispatch({ type: ADD_METADATA, key, value }),
        deleteMetadata: ({ key }) => dispatch({ type: DELETE_METADATA, key }),
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
        insertMock: () => {
            dispatch({
                type: EDIT_REQUEST,
                requestText: JSON.stringify(getMock(state.method.fields), null, 2),
            });
        },
        setMethodSearchText: searchText => dispatch({ type: EDIT_METHOD_SEARCH, searchText }),
        methodSearchText: state.methodSearchText,
        viewParsed: state.viewParsed,
        setViewParsed: viewParsed => dispatch({ type: VIEW_PARSED, viewParsed }),
    };

    return <RecessContext.Provider value={value}>{children}</RecessContext.Provider>;
}
