// Transform grpc autocomplete data to a graphql input type
// so we can use the graphql-codemirror modes

import {
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
} from 'graphql';

function getGrpcDisplayType(data) {
    let displayType = (data.type?.name || '').toLowerCase();
    if (data.isRepeated) {
        displayType = `repeated ${displayType}`;
    } else if (data.isRequired) {
        displayType = `required ${displayType}`;
    } else {
        displayType = `optional ${displayType}`;
    }
    return displayType;
}

function wrap(data, type) {
    let resultType = type;
    if (data.isRepeated) {
        resultType = new GraphQLList(type);
    } else if (data.isRequired) {
        resultType = new GraphQLNonNull(type);
    }

    resultType.grpcDisplayType = getGrpcDisplayType(data);
    return resultType;
}

function getGraphQLTypeFromData(field, types, visited) {
    const matchingType = (types || []).find((type) => field.type.name === type.name) || {};
    if (matchingType.kind === 'SCALAR') {
        switch (matchingType.name) {
            case 'DOUBLE':
            case 'FLOAT':
                return wrap(field, GraphQLFloat);
            case 'INT32':
            case 'INT64':
            case 'UINT32':
            case 'UINT64':
            case 'SINT32':
            case 'SINT64':
            case 'FIXED32':
            case 'FIXED64':
                return wrap(field, GraphQLInt);
            case 'STRING':
                return wrap(field, GraphQLString);
            case 'BOOL':
                return wrap(field, GraphQLBoolean);
            default: {
                throw new Error(`Unrecognized grpc type ${matchingType.name}`);
            }
        }
    } else if (matchingType.kind === 'ENUM') {
        const values = {};
        for (const enumValue of matchingType.enumValues) {
            values[enumValue] = { value: enumValue };
        }
        return wrap(
            field,
            new GraphQLEnumType({
                name: getGrpcDisplayType(field),
                values,
            })
        );
    } else if (matchingType.kind === 'MESSAGE') {
        // don't recurse indefinitely
        const numVisited = visited.get(matchingType) || 0;
        if (numVisited > 25) {
            return null;
        }
        visited.set(matchingType, numVisited + 1);
        let fields = {};
        for (const childField of matchingType.fields || []) {
            fields[childField.name] = {
                type: getGraphQLTypeFromData(childField, types, visited),
            };
        }
        return wrap(
            field,
            new GraphQLInputObjectType({
                name: getGrpcDisplayType(field),
                fields,
            })
        );
    }
    throw new Error(`Unrecognized grpc kind ${matchingType.kind}`);
}

export default function getVariableToType(selectedMethod, types) {
    if (!selectedMethod?.inputType) {
        return {};
    }

    let result = {};
    const matchingType =
        (types || []).find((type) => selectedMethod.inputType.name === type.name) || {};
    for (const field of matchingType.fields || []) {
        result[field.name] = getGraphQLTypeFromData(field, types, new Map());
    }
    return result;
}
