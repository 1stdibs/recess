import { invokeRPC } from '../api';
import { STARTING_REQUEST, COMPLETED_REQUEST, ADD_HISTORY } from '../reducer';

export default async function executeRequest(state, dispatch) {
    dispatch({ type: STARTING_REQUEST });
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
        });
        dispatch({ type: COMPLETED_REQUEST, response });
    } catch (e) {
        dispatch({ type: COMPLETED_REQUEST, response: e.toString() });
    }
}
