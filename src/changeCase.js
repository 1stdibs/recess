import camelCase from 'camel-case';
import snakeCase from 'snake-case';

function traverseObj(fn, obj) {
    if (Array.isArray(obj)) {
        return obj.map(val => traverseObj(fn, val));
    } else if (typeof obj === 'object') {
        let result = {};
        for (const [key, val] of Object.entries(obj)) {
            result[fn(key)] = traverseObj(fn, val);
        }
        return result;
    }
    return obj;
}

export function toCamelCase(requestText) {
    try {
        const obj = JSON.parse(requestText);
        return JSON.stringify(traverseObj(camelCase, obj), null, 2);
    } catch (e) {
        return requestText;
    }
}

export function toSnakeCase(requestText) {
    try {
        const obj = JSON.parse(requestText);
        return JSON.stringify(traverseObj(snakeCase, obj), null, 2);
    } catch (e) {
        return requestText;
    }
}
