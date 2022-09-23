import { ADD_SERVER, DELETE_SERVER, SELECT_SERVER } from '../reducer';

export function selectServer({ dispatch, server }) {
    dispatch({ type: SELECT_SERVER, server });
}

export function addServer({ dispatch, server: { name, port } }) {
    dispatch({ type: ADD_SERVER, name, port });
}

export function deleteServer({ dispatch, index }) {
    dispatch({ type: DELETE_SERVER, index });
}
