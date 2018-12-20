export function getMatchingServices(serverData, methodSearchText) {
    return (serverData || []).filter(service =>
        service.serviceName.toLowerCase().includes(methodSearchText.toLowerCase()) ||
        getMatchingMethodsWithoutService(service.methods, methodSearchText).length > 0
    )
}

export function getMatchingMethods(service, methodSearchText) {
    if (service.serviceName.toLowerCase().includes(methodSearchText.toLowerCase())) {
        return service.methods;
    } else {
        return (service.methods || []).filter(method => method.name.toLowerCase().includes(methodSearchText.toLowerCase()))
    }
}

function getMatchingMethodsWithoutService(methods, methodSearchText) {
    return (methods || []).filter(method => method.name.toLowerCase().includes(methodSearchText.toLowerCase()));
}
