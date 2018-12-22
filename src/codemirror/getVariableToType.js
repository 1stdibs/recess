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
    let displayType = (data.type.split('_')[1] || '').toLowerCase();
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
            return wrap(
                data,
                new GraphQLInputObjectType({
                    name: getGrpcDisplayType(data),
                    fields,
                })
            );
        case 'TYPE_DOUBLE':
        case 'TYPE_FLOAT':
            return wrap(data, GraphQLFloat);
        case 'TYPE_INT32':
        case 'TYPE_INT64':
        case 'TYPE_UINT32':
        case 'TYPE_UINT64':
        case 'TYPE_SINT32':
        case 'TYPE_SINT64':
        case 'TYPE_FIXED32':
        case 'TYPE_FIXED64':
            return wrap(data, GraphQLInt);
        case 'TYPE_STRING':
            return wrap(data, GraphQLString);
        case 'TYPE_BOOL':
            return wrap(data, GraphQLBoolean);
        case 'TYPE_ENUM': {
            const values = {};
            for (const enumValue of data.enumValues) {
                values[enumValue] = { value: enumValue };
            }
            return wrap(
                data,
                new GraphQLEnumType({
                    name: getGrpcDisplayType(data),
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
