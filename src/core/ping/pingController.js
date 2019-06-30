const { Settings } = require('../../../config/config');

module.exports = {
    ping
};

async function ping(req, res) {
    res.ok({ data: new Date(), version: Settings.version, name: Settings.name });
};