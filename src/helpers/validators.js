module.exports = {
    required,
    type,
    pattern,
    minNumber,
    maxNumber,
    minLength,
    maxLength,
    equal,
    isEmail
};

function required(value, field, message) {
    let error = message ? message.replace(/@field/g, field) : `${field} é obrigatório`;

    if (value != 0 && value != false && !value)
        return error;
}

function type(value, expected, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    let error = message ? message.replace(/@field/g, field) : `${field} esperava um tipo ${getType(expected)}, obteve ${typeof value}`;

    if (value.constructor !== expected)
        return error;
}

function pattern(value, pattern, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    const regex = new RegExp(pattern);
    let error = message ? message.replace(/@field/g, field) : `${field} com ${value} é inválido`;

    if (!regex.test(value))
        return error;
}

function minNumber(value, expected, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    let error = message ? message.replace(/@field/g, field) : `${field} não pode ser menor que ${expected}`;

    if (isNaN(value) || value < expected)
        return error;
}

function maxNumber(value, expected, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    let error = message ? message.replace(/@field/g, field) : `${field} não pode ser maior que ${expected}`;

    if (isNaN(value) || value > expected)
        return error;
}

function minLength(value, expected, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    let error = message ? message.replace(/@field/g, field) : `${field} deve possuir um minimo de ${expected} elementos`;

    if (value.constructor === Object && Object.keys(value).length < expected)
        return error;
    else if (value.constructor === Array && value.length < expected)
        return error;
    else if (value.toString().length < expected)
        return error;
}

function maxLength(value, expected, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    let error = message ? message.replace(/@field/g, field) : `${field} não pode possuir mais de ${expected} elementos`;

    if (value.constructor === Object && Object.keys(value).length > expected)
        return error;
    else if (value.constructor === Array && value.length > expected)
        return error;
    else if (value.toString().length > expected)
        return error;
}

function equal(value, expected, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    if (Array.isArray(expected)) {
        let isEqual = expected.some(e => e == value);

        if (!isEqual)
            return message ? message.replace(/@field/g, field) : `${field} deve ser igual á ${expected.map(e => e)}`;;

    } else {
        if (value != expected)
            return message ? message.replace(/@field/g, field) : `${field} deve ser igual á ${expected}`;
    }
}

function isEmail(value, field, message) {
    if (value != 0 && value != false && !value)
        return false;

    let error = message ? message.replace(/@field/g, field) : `${value} inválido em ${field}`;

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value))
        return error;
}

function getType(type) {
    switch (type) {
        case Number:
            return 'Number';
        case String:
            return 'String';
        case Function:
            return 'Function';
        case Array:
            return 'Array';
        case Object:
            return 'Object';
        case Boolean:
            return 'Boolean';
        default:
            return '';
    }
}
