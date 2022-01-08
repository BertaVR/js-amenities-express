

const { MongoClient } = require("mongodb");

// colecciones como array de docs json
const packsCollection = require('./packsCollection');
const itemsCollection = require('./itemsCollection');


const uri =
`mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rpuy3.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('Store_test');
        const packs = database.collection('packs');
        const items = database.collection('items');


        let numPacks = await packs.estimatedDocumentCount();
        if (numPacks > 0) {
            await packs.drop().then((successMessage) => {
                console.log("Droped packs " + successMessage);
            })
            await packs.createIndex( { nombre: 1 }, {unique:true} ).then((successMessage) => {
                console.log("Created unique index " + successMessage);
            })
        }

        let numItems = await items.estimatedDocumentCount();
        if (numItems > 0) {
            await items.drop().then((successMessage) => {
                console.log("Droped items " + successMessage);
            })
            await items.createIndex( { nombre: 1 }, {unique:true} ).then((successMessage) => {
                console.log("Created unique index " + successMessage);
            })
        }

        let result = await items.insertMany(itemsCollection);
        console.log(`${result.insertedCount} == 69 items inserted into store`);

         result = await packs.insertMany(packsCollection);
        console.log(`${result.insertedCount} == 22 packs inserted into store`);


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);