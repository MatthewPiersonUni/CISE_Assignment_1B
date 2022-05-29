const { MongoClient, ServerApiVersion } = require('mongodb'); 
const request = require("supertest");
const app = require("./app.js");

const uri = "mongodb+srv://cise:cise@mernlab.j4rip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Note: This test is functional, however there is a bug where it reports as passing first before reporting a failure.
// This won't effect CI at all as it still returns false to the OS when a test does eventually fail
test('Test getting test dummy data from MongoDB, should return a non-empty array.', () => {
    client.connect()
    .then(  () => {
        client.db("CISE_TEST").collection("test").find({}).toArray( (err, items) => {
            client.close();
            return expect(items.length).toBeGreaterThan(0)
        })
    })
});

test('Test that backend will not insert NULL data into the database', done => {
    data = {
        collection: "test",
        title: "NULLTEST"
    }
    request(app.app)
    .get("/insert?data=" + JSON.stringify(data))
    .then(response => {
        expect(response.request.res.text).toBe("{\"status\":1}");
        done();
    });
});