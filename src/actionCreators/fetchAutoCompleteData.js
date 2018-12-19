import { fetchAutocompleteData } from '../api';
import { LOADING_AUTOCOMPLETE_DATA, LOADED_AUTOCOMPLETE_DATA } from '../reducer';

export default async function fetchAutoCompleteData({
    name,
    port,
    serviceName,
    methodName,
    useCamelCase,
    dispatch,
}) {
    if (name && port && serviceName && methodName) {
        dispatch({ type: LOADING_AUTOCOMPLETE_DATA });
        try {
            const autoCompleteData = await fetchAutocompleteData({
                name,
                port,
                service: serviceName,
                method: methodName,
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
