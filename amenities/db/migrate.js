

const { MongoClient } = require("mongodb");

// colecciones como array de docs json
const packsCollection = require('./packsCollection');

const uri =
`mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rpuy3.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('Store_test');
        const packs = database.collection('packs');

        let numPacks = await packs.estimatedDocumentCount();
        if (numPacks > 0) {
            await packs.drop().then((successMessage) => {
                console.log("Droped packs " + successMessage);
            })
        }

        let result = await packs.insertMany(packsCollection);
        console.log(`${result.insertedCount} == 24 packs inserted into reality`);


    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);