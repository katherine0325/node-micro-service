const mongoose = require('mongoose');

const { mongoConfig } = require('./config');

mongoose.connect(`mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.dbName}`);
const model = mongoose.model('fileData', new mongoose.Schema({}, {strict: false}));

module.export = { model };