// Transform grpc autocomplete data to a graphql input type
// so we can use the graphql-codemirror modes

import {
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
} from 'graphql';

function wrapWithArray(data, type) {
    if (data.isRepeated) {
        return new GraphQLList(type);
    }
    return type;
}

function getGraphQLTypeFromData(data) {
    switch (data.type) {
        case 'TYPE_MESSAGE':
            // todo create input objet
            let fields = {};
            for (const child of data.children) {
                fields[child.name] = {
                    type: getGraphQLTypeFromData(child),
                };
            }
            return new GraphQLInputObjectType({
                name: 'Object',
                fields,
            });
        case 'TYPE_DOUBLE':
        case 'TYPE_FLOAT':
            return wrapWithArray(data, GraphQLFloat);
        case 'TYPE_INT64':
        case 'TYPE_UINT64':
        case 'TYPE_INT32':
        case 'TYPE_UINT32':
            return wrapWithArray(data, GraphQLInt);
        case 'TYPE_STRING':
            return wrapWithArray(data, GraphQLString);
        case 'TYPE_BOOL':
            return wrapWithArray(data, GraphQLBoolean);
        case 'TYPE_ENUM': {
            const values = {};
            for (const enumValue of data.enumValues) {
                values[enumValue] = { value: enumValue };
            }
            return wrapWithArray(
                data,
                new GraphQLEnumType({
                    name: 'Enum',
                    values,
                })
            );
        }
        default: {
            throw new Error(`Unrecognized grpc type ${data.type}`);
        }
    }
}

export default function getVariableToType(autoCompletedata) {
    let result = {};

    for (const data of autoCompletedata || []) {
        result[data.name] = getGraphQLTypeFromData(data);
    }
    return result;
}
