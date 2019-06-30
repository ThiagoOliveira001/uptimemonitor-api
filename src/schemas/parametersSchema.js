const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    api: Object,
    sqlConfig: Object,
    token: Object,
    password: Object
});

module.exports = mongoose.model('parameters', schema);