const repository = require('./usuarioRepository');
const scope = require('./usuarioScope');

module.exports = {
    inserir,
    selecionar,
    buscar,
    deletar
};

async function inserir(req, res) {
    const params = {
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        admin: req.body.admin || false,
        emails: req.body.emails
    };




}

async function selecionar(req, res) {

}

async function buscar(req, res) {

}

async function deletar(req, res) {

}