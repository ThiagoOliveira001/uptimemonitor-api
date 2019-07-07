const token = require('../../helpers/token');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers['authentication'])
            return res.error('Token não fornecido', null, 401);

        let auth = req.headers['authentication'];

        let user = await token.checkToken(auth);
        req.user = user;

        return next();
    
    } catch (error) {
        if (error.expiredAt)
            return res.error('Token expirado, refaça o login', null, 401);

        return res.error('Token inválido', null, 401);
    }
}