const crypto = require('crypto');
const { Settings } = require('../../config/config');

module.exports = {
    encrypt
};  

function encrypt(value) {
    return crypto.createHash('md5').update(`${Settings.password.prefix}${value}${Settings.password.suffix}`).digest('hex');
}