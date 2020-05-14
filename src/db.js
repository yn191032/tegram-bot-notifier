const mongoose = require('mongoose');
const config = require('config');
const { log, error } = require('./logger')('mongodb');

require('./models/User');

mongoose.connect(config.mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  dbName: config.dbName,
});

mongoose.connection.on('open', () => 
  log(`Mongodb is connected to ${mongoose.connection.db.databaseName}`));

mongoose.connection.on('error', (err) => error(err.message));