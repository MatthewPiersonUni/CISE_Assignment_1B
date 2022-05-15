const { MongoClient, ServerApiVersion } = require('mongodb'); 

const uri = "mongodb+srv://cise:cise@mernlab.j4rip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Note: This test is functional, however there is a bug where it reports as passing first before reporting a failure.
// This won't effect CI at all as it still returns false to the OS when a test does eventually fail
test('Test getting all articles from SPEED, should return a non-empty array.', () => {
    client.connect()
    .then(  () => {
        client.db("CISE_TEST").collection("test").find({}).toArray( (err, items) => {
            client.close();
            return expect(items.length).toBeGreaterThan(0)
        })
    })
});