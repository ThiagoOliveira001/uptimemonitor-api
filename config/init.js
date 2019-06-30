module.exports = (express) => {
    app = express();
    processConfig();
    appUse();
}

async function processConfig() {
    const { Settings } = require('./config');
    process.env.SHOW_ROUTES = Settings.isProduction;
}

async function appUse() {
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));

}