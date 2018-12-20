export function includesService(serverData, service) {
    return !!(serverData || []).find(({ serviceName }) => serviceName === service.serviceName);
}

export function includesMethod(service, method) {
    return !!(service.methods || []).find(({ name }) => name === method.name);
}
