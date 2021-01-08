import { toSnakeCase, toCamelCase } from './changeCase';
import { includesMethod, includesService } from './helpers/includesService';

export const ADD_SERVER = 'ADD_SERVER';
export const DELETE_SERVER = 'DELETE_SERVER';
export const SELECT_METHOD = 'SELECT_METHOD';
export const SELECT_SERVER = 'SELECT_SERVER';
export const LOADING_SERVER_DATA = 'LOADING_SERVER_DATA';
export const LOADED_SERVER_DATA = 'LOADED_SERVER_DATA';
export const ERROR_LOADING_SERVER_DATA = 'ERROR_LOADING_SERVER_DATA';
export const EDIT_REQUEST = 'EDIT_REQUEST';
export const STARTING_REQUEST = 'STARTING_REQUEST';
export const COMPLETED_REQUEST = 'COMPLETED_REQUEST';
export const ADD_METADATA = 'ADD_METADATA';
export const DELETE_METADATA = 'DELETE_METADATA';
export const USE_CAMEL_CASE = 'USE_CAMEL_CASE';
export const EDIT_METHOD_SEARCH = 'EDIT_METHOD_SEARCH';
export const VIEW_PARSED = 'VIEW_PARSED';
export const ADD_HISTORY = 'ADD_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const DELETE_ALL_HISTORY = 'DELETE_ALL_HISTORY';
export const EDIT_HISTORY_SEARCH = 'EDIT_HISTORY_SEARCH';
export const EDIT_HISTORY_VISIBLE = 'EDIT_HISTORY_VISIBLE';

export const initialState = {
    servers: [],
    selectedServer: null,
    serverData: [],
    isLoadingServerData: false,
    serverDataError: null,
    service: null,
    method: null,
    isLoadingRequest: false,
    response: '',
    requestText: '',
    metadata: {},
    useCamelCase: true,
    viewParsed: true,
    requestTextByMethod: {},
    methodSearchText: '',
    historySearchText: '',
    history: [],
    historyVisible: true,
};

export default function reducer(state, action) {
    switch (action.type) {
        case ADD_SERVER:
            return {
                ...state,
                servers: [...state.servers, { name: action.name, port: action.port }],
            };
        case DELETE_SERVER:
            const updatedServers = state.servers.filter((_, i) => i !== action.i);
            return {
                ...state,
                servers: updatedServers,
                selectedServer: updatedServers[0] || null,
                serverData: null,
            };

        case SELECT_SERVER:
            return {
                ...state,
                selectedServer: action.server,
                serverData: null,
            };
        case LOADING_SERVER_DATA: {
            return {
                ...state,
                serverData: null,
                isLoadingServerData: true,
                serverDataError: null,
            };
        }
        case LOADED_SERVER_DATA: {
            let newService = action.newService || state.service;
            let newMethod = action.newMethod || state.method;
            if (!newService || !includesService(action.serverData, newService)) {
                // select the first non-reflection service
                // unless the reflection service is the only rpc
                if (action.serverData.services.length === 1) {
                    newService = action.serverData[0];
                    newMethod = newService.methods[0];
                } else if (action.serverData.services.length > 1) {
                    newService = action.serverData.services.filter(
                        (s) => s.name !== 'grpc.reflection.v1alpha.ServerReflection'
                    )[0];
                    newMethod = newService.methods[0];
                }
            } else if (!includesMethod(newService, newMethod)) {
                newService = action.serverData.services.find((s) => s.name === newService.name);
                newMethod = newService.methods[0];
            } else {
                newService = action.serverData.services.find((s) => s.name === newService.name);
                newMethod = newService.methods.find((m) => m.name === newMethod.name);
            }
            return {
                ...state,
                serverData: action.serverData,
                service: newService,
                method: newMethod,
                isLoadingServerData: false,
                serverDataError: null,
                metadata: action.metadata || state.metadata,
                requestText:
                    action.requestText ||
                    state.requestTextByMethod[newService.name + '/' + newMethod.name],
            };
        }
        case ERROR_LOADING_SERVER_DATA: {
            return {
                ...state,
                serverData: null,
                isLoadingServerData: false,
                serverDataError: action.error,
            };
        }
        case SELECT_METHOD:
            return {
                ...state,
                service: action.service,
                method: action.method,
                requestText:
                    state.requestTextByMethod[action.service.name + '/' + action.method.name],
            };
        case EDIT_REQUEST: {
            return {
                ...state,
                requestText: action.requestText,
                requestTextByMethod: {
                    ...state.requestTextByMethod,
                    [state.service?.name + '/' + state.method?.name]: action.requestText,
                },
            };
        }
        case STARTING_REQUEST: {
            return {
                ...state,
                isLoadingRequest: true,
            };
        }
        case COMPLETED_REQUEST: {
            return {
                ...state,
                isLoadingRequest: false,
                response: action.response,
            };
        }
        case ADD_METADATA:
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    [action.key]: action.value,
                },
            };
        case DELETE_METADATA:
            const newMetadata = {
                ...state.metadata,
            };
            delete newMetadata[action.key];
            return {
                ...state,
                metadata: newMetadata,
            };
        case USE_CAMEL_CASE:
            return {
                ...state,
                useCamelCase: action.useCamelCase,
                requestText: action.useCamelCase
                    ? toCamelCase(state.requestText)
                    : toSnakeCase(state.requestText),
                requestTextByMethod: Object.entries(state.requestTextByMethod).reduce(
                    (acc, [key, val]) => ({
                        ...acc,
                        [key]: action.useCamelCase ? toCamelCase(val) : toSnakeCase(val),
                    }),
                    {}
                ),
            };
        case EDIT_METHOD_SEARCH:
            return {
                ...state,
                methodSearchText: action.searchText,
            };
        case VIEW_PARSED:
            return {
                ...state,
                viewParsed: action.viewParsed,
            };
        case ADD_HISTORY:
            const dateString = new Date().toLocaleString();
            return {
                ...state,
                history: [
                    {
                        server: action.server,
                        serviceName: action.serviceName,
                        methodName: action.methodName,
                        requestText: action.requestText,
                        metadata: action.metadata,
                        date: dateString,
                        id: dateString,
                    },
                ].concat(state.history),
            };
        case DELETE_HISTORY:
            return {
                ...state,
                history: state.history.filter((entry) => entry.id !== action.entryId),
            };
        case DELETE_ALL_HISTORY:
            return {
                ...state,
                history: [],
            };
        case EDIT_HISTORY_SEARCH:
            return {
                ...state,
                historySearchText: action.searchText,
            };
        case EDIT_HISTORY_VISIBLE:
            return {
                ...state,
                historyVisible: action.historyVisible,
            };
        default:
            throw new Error(`invalid action ${action.type}`);
    }
}
