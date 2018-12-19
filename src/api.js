const baseURL = 'http://localhost:4444';

export async function fetchServerInfo({ name, port }) {
    const params = new URLSearchParams({ server: name, port }).toString();
    const res = await fetch(`${baseURL}/services?${params}`);
    return await res.json();
}

export async function invokeRPC({ name, port, service, method, requestText, metadata }) {
    const res = await fetch(`${baseURL}/invoke`, {
        method: 'post',
        body: JSON.stringify({
            server: name,
            port,
            service,
            method,
            metadata,
            body: JSON.parse(requestText),
        }),
    });

    let responseText = await res.text();
    try {
        responseText = JSON.parse(responseText);
    } catch (e) {
        // fallback to text response
    }
    return responseText;
}

export async function fetchAutocompleteData({ name, port, service, method }) {
    try {
        const res = await fetch(`${baseURL}/autocompleteData`, {
            method: 'post',
            body: JSON.stringify({
                server: name,
                port,
                service,
                method,
            }),
        });

        return await res.json();
    } catch (e) {
        return null;
    }
}

window.fetchAutocompleteData = fetchAutocompleteData;
