const baseURL = 'http://192.168.99.136:4444';

export async function fetchServerInfo({name, port}) {
    const params = new URLSearchParams({name, port}).toString();
    const res = await fetch(baseURL + '/servers?' params );
    return await res.json();
}
