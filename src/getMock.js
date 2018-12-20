function wrap(data, type) {
    let resultType = type;
    if (data.isRepeated) {
        resultType = [type];
    }
    return resultType;
}

function getMockTypeFromData(data) {
    switch (data.type) {
        case 'TYPE_MESSAGE':
            // todo create input objet
            let fields = {};
            for (const child of data.children) {
                fields[child.name] = getMockTypeFromData(child);
            }
            return wrap(data, fields);
        case 'TYPE_DOUBLE':
        case 'TYPE_FLOAT':
            return wrap(data, 3.14);
        case 'TYPE_INT64':
        case 'TYPE_UINT64':
        case 'TYPE_INT32':
        case 'TYPE_UINT32':
            return wrap(data, 5);
        case 'TYPE_STRING':
            return wrap(data, 'Hello, World!');
        case 'TYPE_BOOL':
            return wrap(data, true);
        case 'TYPE_ENUM': {
            return wrap(data, data.enumValues[0]);
        }
        default: {
            throw new Error(`Unrecognized grpc type ${data.type}`);
        }
    }
}

export default function getMock(autoCompletedata) {
    let result = {};

    for (const data of autoCompletedata || []) {
        result[data.name] = getMockTypeFromData(data);
    }
    return result;
}
