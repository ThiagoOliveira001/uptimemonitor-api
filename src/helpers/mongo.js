const mongoose = require('mongoose');

module.exports = {
    connection,
    getParameters,
    getRoutes
};

async function connection(conn) {
    const uri = `mongodb://${encodeURIComponent(conn.user)}:${encodeURIComponent(conn.password)}@${conn.host}:${conn.port}/${conn.database}`;

    return await mongoose.connect(uri, {
        socketTimeoutMS: 5000,
        keepAlive: true,
        reconnectTries: 5
    });
}

async function getParameters() {
    const parameters = require('../schemas/parametersSchema');

    let result = await parameters.findOne({});

    return result._doc;
}

async function getRoutes() {
    const routes = require('../schemas/routesSchema');

    let result = await routes.find({});

    return result;
}