export function includesService(serverData, service) {
    return !!(serverData?.services || []).find(({ name }) => name === service.name);
}

export function includesMethod(service, method) {
    return !!(service.methods || []).find(({ name }) => name === method.name);
}
