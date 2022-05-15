var express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
var mongodb = require('mongodb');
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
        res.send({results: await client.db("CISE_TEST").collection(collection).find({ [row]: query }).toArray()})
    })
}

async function databaseFindAll(res, collection) {
    client.connect()
    .then( async () => {
        res.send({results: await client.db("CISE_TEST").collection(collection).find({}).toArray()})
    })
}

async function databaseInsert(res, collection, data) {
    client.connect()
    .then( async () => {
        await client.db("CISE_TEST").collection(collection).insertOne(data, function(err) {
            if (err) res.send({result: 1});
            res.send({result: 0})
          })
    })
}

async function databaseRemove(res = null, collection, id) {
    client.connect()
    .then( async () => {
        await client.db("CISE_TEST").collection(collection).deleteOne({_id: new mongodb.ObjectID(String(id))}, function(err) {
            if (err) {
                if (res) {
                    res.send({result: 1});
                }
            }
            if (res) {
                res.send({result: 0});
            }
          })
    })
}

async function moveItemFromAnalystQueueToSPEED(res, id, data) {
    await databaseRemove(null, "analysisQueue", id)
    databaseInsert(res, "SPEED", data)
}

async function moveItemFromModerationQueueToAnalystQueue(res, id, data) {
    await databaseRemove(null, "moderationQueue", id)
    databaseInsert(res, "analysisQueue", data)
}

async function moveItemFromModerationQueueToRejectedArticles(res, id, data) {
    await databaseRemove(null, "moderationQueue", id)
    databaseInsert(res, "rejectedArticles", data)
}

function getAllArticles(res) {
    databaseFindAll(res, "SPEED")
}

function getAllModerationQueue(res) {
    databaseFindAll(res, "moderationQueue")
}

function getAllAnalysisQueue(res) {
    databaseFindAll(res, "analysisQueue")
}

function getAllRejectedArticles(res) {
    databaseFindAll(res, "rejectedArticles")
}

app.get('/search', (req, res) => {
    // Get search term from 
    var collection = req.query.collection
    var row = req.query.row
    var searchPhrase = req.query.search
    // Call databaseFind(query) to get found results back
    databaseFind(res, collection, row, searchPhrase)
})

app.get('/getAllArticles', (req, res) => {
    getAllArticles(res)
})

app.get('/removeArticle', (req, res) => {
    var collection = req.query.collection
    var id = req.query.id
    databaseRemove(res, collection, id)
})

app.get('/insert', (req, res) => {
    var collection = req.query.collection
    var data
    switch (collection) {
        case 'SPEED':
            data = {
                title: req.query.title,
                doi: req.query.doi,
                publicationYear: Number(req.query.publicationYear),
                volume: Number(req.query.volume),
                number: Number(req.query.number),
                journalName: req.query.journalName,
                summary: req.query.summary,
                practiceType: Number(req.query.practiceType),
                authors: req.query.authors,
            }
            break;
        case 'rejectedArticles':
            data = {
                doi: req.query.doi,
                rejectName: req.query.rejectName,
                rejectTime: new Date(),
            }
            break;
        case 'moderationQueue':
            data = {
                doi: req.query.doi,
                submitDate: new Date(),
                submitterName: req.query.submitterName,
                submitterEmail: req.query.submitterEmail,
            }
            break;
        case 'analysisQueue':
            data = {
                doi: req.query.doi,
                submitDate: new Date(),
                submitterName: req.query.submitterName,
                submitterEmail: req.query.submitterEmail,
                moderatorName: req.query.moderatorName,
                moderatorEmail: req.query.moderatorEmail,
            }
            break;
        default:
            res.send({status: 1})
            return;
    }
    databaseInsert(res, collection, data)
})

module.exports = app;
