const baseURL = 'http://192.168.99.136:4444';

export async function fetchServerInfo(serverName) {
    const { server, port } = serverName.split(':');
    const res = await fetch(baseURL + '/servers?server=');
}
