const { Settings } = require('../../../config/config');
const pg = require('smn-pg')(Settings.sqlConfig);

module.exports = {
    login
};

const procedures = {
    login: 'seguranca.login'
};

async function login(params) {
    return await pg.request()
        .input(params, 'p')
        .asyncExecOne(procedures.login);
}