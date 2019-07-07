const jwt = require('jsonwebtoken');
const { Settings } = require('../../config/config');

module.exports = {
    createToken,
    checkToken
};

function createToken(data) {
    const token = await jwt.sign({
        exp: Settings.token.exp,
        data: data
    }, Settings.token.secret);

    return token;
}

async function checkToken(token) {
    let decoded = await jwt.verify(token, Settings.token.secret);

    return decoded;
}