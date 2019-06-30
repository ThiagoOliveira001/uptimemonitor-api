const config = {
    name: 'uptime',
    version: '1.0.0',
    isProduction: process.NODE_ENV === 'production', 
    numCpus: process.env.CPU_COUNT || 1,
    mongo: {
        port: process.env.MONGO_PORT || 27017,
        host: process.env.MONGO_HOST || 'localhost',
        database: process.env.MONGO_DATABASE || 'uptimemonitor',
        user: process.env.MONGO_USER || 'mongodev',
        password: process.env.MONGO_PASSWORD || 'mongodev' 
    }
};

module.exports = config;