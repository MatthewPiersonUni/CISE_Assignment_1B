var express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Move this 
const uri = "mongodb+srv://cise:cise@mernlab.j4rip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function databaseFind(res, collection, row, query) {
    client.connect()
    .then( async () => {
        res.send(await client.db("CISE_TEST").collection(collection).find({ [row]: query }).toArray())
    })
}

app.get('/search', (req, res) => {
    // Get search term from 
    var collection = req.query.collection
    var row = req.query.row
    var searchPhrase = req.query.search
    console.log(collection + " " + row + " " + searchPhrase)
    // Parse searchPhrase to prevent unwanted modifications to the database
    // DO PARSING HERE
    // Call databaseFind(query) to get found results back
    databaseFind(res, collection, row, searchPhrase)
})



module.exports = app;
