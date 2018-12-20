import { fetchAutocompleteData } from '../api';
import { LOADING_AUTOCOMPLETE_DATA, LOADED_AUTOCOMPLETE_DATA } from '../reducer';
import { includesMethod, includesService } from '../helpers/includesService';

export default async function fetchAutoCompleteData({
    name,
    port,
    service,
    method,
    useCamelCase,
    serverData,
    dispatch,
}) {
    if (
        name &&
        port &&
        service.serviceName &&
        method.name &&
        includesService(serverData, service) &&
        includesMethod(service, method)
    ) {
        dispatch({ type: LOADING_AUTOCOMPLETE_DATA });
        try {
            const autoCompleteData = await fetchAutocompleteData({
                name,
                port,
                service: service.serviceName,
                method: method.name,
                useCamelCase,
            });
            dispatch({ type: LOADED_AUTOCOMPLETE_DATA, autoCompleteData });
        } catch (e) {
            dispatch({
                type: LOADED_AUTOCOMPLETE_DATA,
                autoCompleteData: null,
            });
        }
    } else {
        dispatch({
            type: LOADED_AUTOCOMPLETE_DATA,
            autoCompleteData: null,
        });
    }
}
