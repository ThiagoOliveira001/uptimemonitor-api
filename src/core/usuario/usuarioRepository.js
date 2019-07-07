const { Settings } = require('../../../config/config');
const pg = require('smn-pg')(Settings.sqlConfig);

module.exports = {
    inserir,
    selecionar,
    buscar,
    alterar,
    deletar
};

const procedures = {
    inserir: 'seguranca.inserirUsuario',
    selecionar: 'seguranca.selecionarUsuarios',
    buscar: 'seguranca.buscarUsuario',
    alterar: 'seguranca.alterarUsuario',
    deletar: 'seguranca.deletarUsuario'
};

async function inserir(params) {
    return await pg.request()
        .input(params , 'p')
        .asyncExecOne(procedures.inserir);
}

async function selecionar(params) {
    return await pg.request()
        .input(params , 'p')
        .asyncExec(procedures.selecionar);
}

async function buscar(params) {
    return await pg.request()
        .input(params , 'p')
        .asyncExecOne(procedures.buscar);
}

async function alterar(params) {
    return await pg.request()
        .input(params , 'p')
        .asyncExecOne(procedures.alterar);
}

async function deletar(params) {
    return await pg.request()
        .input(params , 'p')
        .asyncExecOne(procedures.deletar);
}