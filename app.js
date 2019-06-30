const cf = require('./config/config');
const express = require('express');
const init = require('./config/init')(express);
const route = require('./src/api/routes/route');
const response = require('./src/api/middleware/response');

(async () => {
    try {
        await cf.init();

        const router = await route.getRouter();

        app.use(response);
        app.use('/api', router);

        app.listen(cf.getPort(), () => {
            console.log(`SERVER LISTENNING ON PORT ${cf.getPort()}`);
        });

    } catch (error) {
        console.error(error);
    }
})();