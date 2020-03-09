function wrap(data, type) {
    let resultType = type;
    if (data.isRepeated) {
        resultType = [type];
    }
    return resultType;
}

function getMockTypeFromData(field, types, visited) {
    const matchingType = (types || []).find(type => field.type.name === type.name) || {};
    if (matchingType.kind === 'SCALAR') {
        switch (matchingType.name) {
            case 'DOUBLE':
            case 'FLOAT':
                return wrap(field, 3.14);
            case 'INT64':
            case 'UINT64':
            case 'INT32':
            case 'UINT32':
                return wrap(field, 5);
            case 'STRING':
                return wrap(field, 'Hello, World!');
            case 'BOOL':
                return wrap(field, true);
            default: {
                throw new Error(`Unrecognized grpc type ${matchingType.name}`);
            }
        }
    } else if (matchingType.kind === 'ENUM') {
        return wrap(field, matchingType.enumValues[0]);
    } else if (matchingType.kind === 'MESSAGE') {
        // don't recurse indefinitely
        const numVisited = visited.get(matchingType) || 0;
        if (numVisited > 2) {
            return null;
        }
        visited.set(matchingType, numVisited + 1);
        // todo create input objet
        let fields = {};
        for (const childField of matchingType.fields) {
            fields[childField.name] = getMockTypeFromData(childField, types, visited);
        }
        return wrap(field, fields);
    }
    throw new Error(`Unrecognized grpc kind ${matchingType.kind}`);
}

export default function getMock({ inputType, types }) {
    let result = {};
    const matchingType = (types || []).find(type => inputType.name === type.name) || {};
    for (const data of matchingType.fields || []) {
        result[data.name] = getMockTypeFromData(data, types, new Map());
    }
    return result;
}
