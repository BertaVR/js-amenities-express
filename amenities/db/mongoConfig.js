
var mongoose = require('mongoose');

/**
 * NODE_ENV=development
 * NODE_ENV=production
 * NODE_ENV=test
 */
var databaseUri = {
    production: `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rpuy3.mongodb.net/Store?retryWrites=true&w=majority`,

    //production: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@sandbox.rpuy3.mongodb.net/Store?retryWrites=true&w=majority`,


    development: `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rpuy3.mongodb.net/Store?retryWrites=true&w=majority`,

    //development: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@sandbox.rpuy3.mongodb.net/Store?retryWrites=true&w=majority`,
    
    test: `mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rpuy3.mongodb.net/Store_test?retryWrites=true&w=majority`

    //test: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@sandbox.rpuy3.mongodb.net/Store_test?retryWrites=true&w=majority`
}

module.exports = {
    mongoose,   // usado por app()
    connect: () => {
        console.log("connecting to DB")
        // connect es usado por app()
        // connect devuelve una promesa, es asincrono
        mongoose.Promise = Promise;
        console.log(process.env.NODE_ENV);
        mongoose.connect(databaseUri[process.env.NODE_ENV], { useNewUrlParser: true , useUnifiedTopology: true});
    },
    disconnect: done => {
        // done es una variable que indica
        // que una operacion async esta terminada
        // disconnect es usado en beforeAll en Jest
        mongoose.disconnect(done);
    },
    databaseUri,
};