import { invokeRPC } from '../api';
import { STARTING_REQUEST, COMPLETED_REQUEST, ADD_HISTORY } from '../reducer';

export default async function executeRequest(store, dispatch) {
    const state = store.getState();
    if (state.requestAbortController) {
        state.requestAbortController.abort?.();
    }
    const newAbortController = new AbortController();
    dispatch({ type: STARTING_REQUEST, abortController: newAbortController });
    dispatch({
        type: ADD_HISTORY,
        server: state.selectedServer,
        serviceName: state.service.name,
        methodName: state.method.name,
        requestText: state.requestText,
        metadata: state.metadata,
    });
    try {
        const response = await invokeRPC({
            ...state.selectedServer,
            service: state.service.name,
            method: state.method.name,
            requestText: state.requestText,
            metadata: state.metadata,
            useCamelCase: state.useCamelCase,
            signal: newAbortController.signal,
        });
        dispatch({ type: COMPLETED_REQUEST, response });
    } catch (e) {
        if (e.name !== 'AbortError') {
            dispatch({ type: COMPLETED_REQUEST, response: e.toString() });
        }
    }
}
