const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    url: String,
    method: String,
    funcionalidade: String,
    controller: String,
    public: Boolean
});

module.exports = mongoose.model('routes', schema);