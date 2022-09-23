import { ADD_METADATA, DELETE_METADATA } from '../reducer';

export function addMetadata({ dispatch, key, value }) {
    dispatch({ type: ADD_METADATA, key, value });
}

export function deleteMetadata({ dispatch, key }) {
    dispatch({ type: DELETE_METADATA, key });
}
