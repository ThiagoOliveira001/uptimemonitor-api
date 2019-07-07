const repository = require('./loginRepository');
const token = require('../../helpers/token');

module.exports = {
    login,
    autenticar,
    resetPassword
};

async function login(req, res) {
    const params = {
        login: req.body.login,
        senha: req.body.senha
    };

    let data = await repository.login(params);

    if (!data)
        return res.error({ snack: "Login e/ou senha inválidos" }, null, 401);
    else if (!data.ativo)
        return res.error({ snack: "Acesso negado, contate o administrador" }, null, 401);

    const userToken = await token.createToken(data);

    let user = {
        nome: data.nome,
        email: data.email
    };

    res.ok({ token: userToken, user });
}

async function autenticar(req, res) {
    const userToken = req.headers['autenticacao'];

    try {
        let data = await token.checkToken(userToken);

        let user = {
            nome: data.nome,
            email: data.email,
        };
    
        res.ok({ user, token: userToken });

    } catch (error) {
        if (error.expiredAt)
            return res.error('Token expirado, refaça o login', null, 401);

        return res.error('Token inválido', null, 401);
    }
}