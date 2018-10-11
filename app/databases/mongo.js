const config = require('../../config/db.config');
const mongoose = require('mongoose');

// database configs
const dbHost = config.database.connectionconfig.host;
const dbPort = config.database.connectionconfig.port;
const dbName = config.database.connectionconfig.db;
const dbURI = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

/**
 * establish a connection with database
 * 
 *  */ 
function connect() {
    mongoose.connect(dbURI, { 
        auto_reconnect: true, 
        useNewUrlParser: true
    }).catch(() => {});
}

module.exports = () => {
    const db = mongoose.connection;
  
    // action items depending on database connectivity
    db.on('connecting', () => {
        console.log('Connecting to DB...');
    });
  
    db.on('error', (err) => {
        console.log(`DB connection error: ${err}`);
        mongoose.disconnect();
    });
  
    db.on('connected', () => {
        console.log('Connected to DB!');
    });
  
    db.once('open', () => {
        console.log('DB connection opened!');
    });
  
    db.on('reconnected', () => {
        console.log('DB reconnected!');
    });
  
    db.on('disconnected', () => {
        console.log('DB disconnected! Reconnecting in 4s');
        setTimeout(() => connect(), 4000);
    });
  
    connect();
};