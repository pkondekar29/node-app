/**
 * declare configurations and export them
 */
module.exports = {

    // database configs
    database : {
        connectionconfig : {
            host : "mongo",
            port : 27017,
            dbName : "testdb",
            userName: "mongoadmin",
            password: "secret"
        }
    }
}