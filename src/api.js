const baseURL = 'http://192.168.99.136:4444';

export async function fetchServerInfo({ name, port }) {
    const params = new URLSearchParams({ server: name, port }).toString();
    const res = await fetch(`${baseURL}/services?${params}`);
    return await res.json();
}
