const baseURL = process.env.REACT_APP_API || '';

export async function fetchServerInfo({ name, port, useCamelCase }) {
    const params = new URLSearchParams({
        server: name,
        port,
        autocompleteData: true,
        camelCase: useCamelCase,
    }).toString();
    const res = await fetch(`${baseURL}/services?${params}`);
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
    service,
    method,
    requestText,
    metadata,
    useCamelCase,
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
