const config = require('../config/db.config');
const mongoose = require('mongoose');

// database configs (remote) using Vcap_services in CF
//var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
//const mongoDbCredentials = vcap_services.mongodb[0].credentials;

// dbUrl
//const dbURI = mongoDbCredentials.uri;
//console.log(dbURI);

// database configs
const dbHost = config.database.connectionconfig.host;
const dbPort = config.database.connectionconfig.port;
const dbName = config.database.connectionconfig.dbName;
const userName = config.database.connectionconfig.userName;
const password = config.database.connectionconfig.password;
const dbURI = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

// const dbURI = 'mongodb://' + userName + ':' + password + '@' + dbHost + ':' + dbPort + '/' + dbName;

console.log('Trying to connect to: ' + dbURI)
/**
 * establish a connection with database
 * 
 *  */ 
function connect() {
    mongoose.connect(dbURI, { 
        auto_reconnect: true, 
        useNewUrlParser: true
    }).catch((err) => {
        console.log("Could not connect to DB: " + dbURI);
    });
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