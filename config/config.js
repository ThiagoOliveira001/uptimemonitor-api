const Settings = require('./environment/settings');
const mongo = require('../src/helpers/mongo');


let obj = {
    Settings,
    init: async () => {
        //Apenas para mudar as configs do mongo
        !Settings.isProduction ? Object.assign(obj.Settings, require('./environment/localSettings')) : null;

        await mongo.connection(obj.Settings.mongo);

        let parameters = await mongo.getParameters();

        Object.assign(obj.Settings, parameters);
        
        !Settings.isProduction ? Object.assign(obj.Settings, require('./environment/localSettings')) : null;
    },
    getPort: () => {
        return Settings.api[obj.Settings.name].port;
    },
    getHost: () => {
        return Settings.api[obj.Settings.name].host;
    }
};

module.exports = obj;