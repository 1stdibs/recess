const baseURL = 'http://localhost:4444';

export async function fetchServerInfo({ name, port }) {
    const params = new URLSearchParams({ server: name, port }).toString();
    const res = await fetch(`${baseURL}/services?${params}`);
    return await res.json();
}

export async function invokeRPC({ name, port, service, method, body }) {
    const res = await fetch(`${baseURL}/invoke`, {
        method: 'post',
        body: JSON.stringify({
            server: name,
            port,
            service,
            method,
            metadata: {
                userToken:
                    '10224243_34064c666b3a18a2c414192e3b5956f05937b0697d33e0c0110cea41247f0a69',
            },
            body,
        }),
    });

    return await res.json();
}
