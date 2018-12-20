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
export const LOADING_AUTOCOMPLETE_DATA = 'LOADING_AUTOCOMPLETE_DATA';
export const LOADED_AUTOCOMPLETE_DATA = 'LOADED_AUTOCOMPLETE_DATA';
export const USE_CAMEL_CASE = 'USE_CAMEL_CASE';
export const EDIT_METHOD_SEARCH = 'EDIT_METHOD_SEARCH';
export const VIEW_PARSED = 'VIEW_PARSED';

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
};

export default function reducer(state, action) {
    switch (action.type) {
        case ADD_SERVER:
            return {
                ...state,
                servers: [...state.servers, { name: action.name, port: action.port }],
            };
        case DELETE_SERVER:
            return {
                ...state,
                servers: state.servers.filter((_, i) => i !== action.i),
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
            let newService = state.service;
            let newMethod = state.method;
            if (!state.service || !includesService(action.serverData, state.service)) {
                // select the first non-reflection service
                newService = action.serverData.filter(
                    s => s.serviceName !== 'grpc.reflection.v1alpha.ServerReflection'
                )[0];
                newMethod = newService.methods[0];
            } else if (!includesMethod(newService, newMethod)) {
                newMethod = newService.methods[0];
            }
            return {
                ...state,
                serverData: action.serverData,
                service: newService,
                method: newMethod,
                isLoadingServerData: false,
                serverDataError: null,
                requestText:
                    state.requestTextByMethod[newService.serviceName + '/' + newMethod.name],
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
                    state.requestTextByMethod[
                        action.service.serviceName + '/' + action.method.name
                    ],
            };
        case EDIT_REQUEST: {
            return {
                ...state,
                requestText: action.requestText,
                requestTextByMethod: {
                    ...state.requestTextByMethod,
                    [state.service.serviceName + '/' + state.method.name]: action.requestText,
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
        case LOADING_AUTOCOMPLETE_DATA:
            return {
                ...state,
                autoCompleteData: null,
                isLoadingAutoCompleteData: true,
            };
        case LOADED_AUTOCOMPLETE_DATA:
            return {
                ...state,
                autoCompleteData: action.autoCompleteData,
                isLoadingAutoCompleteData: false,
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
        default:
            throw new Error(`invalid action ${action.type}`);
    }
}
