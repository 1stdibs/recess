import { EDIT_REQUEST } from '../reducer';

export function formatRequest({ dispatch, requestText }) {
    try {
        const newRequestText = JSON.stringify(JSON.parse(requestText), null, 2);
        dispatch({ type: EDIT_REQUEST, requestText: newRequestText });
    } catch (e) {
        // do nothing
    }
}
