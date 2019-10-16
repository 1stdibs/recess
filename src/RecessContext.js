import React, { useReducer, useEffect, useCallback } from 'react';
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

    useEffect(() => {
        fetchServerData(state.selectedServer, state.useCamelCase, dispatch);
    }, [state.selectedServer, state.useCamelCase]);

    useEffect(() => {
        localStorage.setItem(
            'recessState',
            JSON.stringify({
                ...state,
                // don't store data fetched from back end
                serverData: [],
                response: null,
            })
        );
    }, [state]);

    const selectServer = useCallback(server => dispatch({ type: SELECT_SERVER, server }), []);

    const selectMethod = useCallback(
        (service, method) => dispatch({ type: SELECT_METHOD, service, method }),
        []
    );

    const reloadServerData = useCallback(
        () => fetchServerData(state.selectedServer, state.useCamelCase, dispatch),
        [state.selectedServer, state.useCamelCase]
    );

    const addServer = useCallback(
        ({ name, port }) => dispatch({ type: ADD_SERVER, name, port }),
        []
    );

    const deleteServer = useCallback(i => dispatch({ type: DELETE_SERVER, i }), [dispatch]);
    const setRequestText = useCallback(
        requestText => dispatch({ type: EDIT_REQUEST, requestText }),
        []
    );

    const addMetadata = useCallback(
        ({ key, value }) => dispatch({ type: ADD_METADATA, key, value }),
        []
    );

    const deleteMetadata = useCallback(({ key }) => dispatch({ type: DELETE_METADATA, key }), []);

    const setCamelCase = useCallback(
        useCamelCase => dispatch({ type: USE_CAMEL_CASE, useCamelCase }),
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

    const insertMock = useCallback(() => {
        dispatch({
            type: EDIT_REQUEST,
            requestText: JSON.stringify(getMock(state.method.fields), null, 2),
        });
    }, [state.method ? state.method.fields : null]);

    const setMethodSearchText = useCallback(
        searchText => dispatch({ type: EDIT_METHOD_SEARCH, searchText }),
        [dispatch]
    );

    const setViewParsed = useCallback(
        viewParsed => dispatch({ type: VIEW_PARSED, viewParsed }),
        []
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
    };

    return <RecessContext.Provider value={value}>{children}</RecessContext.Provider>;
}
