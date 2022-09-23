import { EDIT_METHOD_SEARCH, SELECT_METHOD } from '../reducer';
import fetchServerData from './fetchServerData';

export function selectMethod({ dispatch, service, method }) {
    dispatch({ type: SELECT_METHOD, service, method });
}

export function reloadServerData({ dispatch, selectedServer, useCamelCase }) {
    fetchServerData({
        selectedServer,
        useCamelCase,
        dispatch,
    });
}

export function setMethodSearchText({ dispatch, searchText }) {
    dispatch({ type: EDIT_METHOD_SEARCH, searchText });
}
