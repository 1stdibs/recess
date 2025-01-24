const baseURL = process.env.REACT_APP_API || '';

export async function fetchServerInfo({ name, port, ssl, useCamelCase, signal }) {
    const params = new URLSearchParams({
        server: name,
        port,
        autocompleteData: true,
        camelCase: useCamelCase,
        ssl,
    }).toString();
    const res = await fetch(`${baseURL}/services?${params}`, { signal });
    if (!res.ok) {
        throw Error(res.statusText);
    }

    const data = await res.json();
    const sortedServices = data.services
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((service) => {
            return {
                ...service,
                methods: service.methods.sort((a, b) => a.name.localeCompare(b.name)),
            };
        });
    return {
        types: data.types,
        services: sortedServices,
    };
}

export async function invokeRPC({
    name,
    port,
    ssl,
    service,
    method,
    requestText,
    metadata,
    useCamelCase,
    signal,
}) {
    if (!requestText) {
        requestText = '{}';
    }
    const res = await fetch(`${baseURL}/invoke?camelCase=${useCamelCase}`, {
        method: 'post',
        body: JSON.stringify({
            server: name,
            port,
            service,
            method,
            metadata,
            ssl,
            body: JSON.parse(requestText),
        }),
        signal,
    });

    let responseText = await res.text();
    try {
        if (!res.ok) {
            responseText = { error: JSON.parse(responseText).message };
        } else {
            responseText = JSON.parse(responseText);
        }
    } catch (e) {
        // fallback to text response
    }
    return responseText;
}
