const express = require('express');
const mongo = require('../../helpers/mongo');
const auth = require('../middleware/auth');
const router = express.Router();

module.exports = {
    getRouter
};

async function getRouter() {
    let routes = await mongo.getRoutes();

    routes.forEach(route => {
        let ctrl = require(`../../core/${route.funcionalidade}/${route.funcionalidade}Controller.js`);

        if (process.env.SHOW_ROUTES)
            console.log(`${route.funcionalidade} - ${route.method} - ${route.url} - ${route.controller}`);

        if (route.public)
            router[route.method](route.url, handle(ctrl[route.controller]));    
        else 
            router[route.method](route.url, auth, handle(ctrl[route.controller]));
    });

    return router;
}

function handle(controller) {
    return async (req, res) => {
        try {
            await controller(req, res);
        } catch (error) {
            return res.error(error.messages || null, error, error.statusCode);
        }
    };
}