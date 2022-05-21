var express = require('express');
const path = require('path');
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

async function databaseFind(res = null, collection, row, query) {
    client.connect()
    .then( async () => {
        if (res) {
            res.send({results: await client.db("CISE_TEST").collection(collection).find({ [row]: query }).toArray()})
        } else {
            return await client.db("CISE_TEST").collection(collection).find({ [row]: query }).toArray()
        }
    })
}

async function databaseFindAll(res = null, collection) {
    client.connect()
    .then( async () => {
        if (res) {
            res.send({results: await client.db("CISE_TEST").collection(collection).find({}).toArray()})
        } else {
            return await client.db("CISE_TEST").collection(collection).find({}).toArray()
        }
    })
}

async function databaseInsert(res = null, collection, data) {
    client.connect()
    .then( async () => {
        await client.db("CISE_TEST").collection(collection).insertOne(data, function(err) {
            if (err) {
                if (res) {
                    res.send({result: 1});
                } else {
                    return 1
                }
            }
            if (res) {
                res.send({result: 0});
            } else {
                return 0
            }
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
                } else {
                    return 1}
            }
            if (res) {
                res.send({result: 0});
            } else {
                return 1
            }
          })
    })
}

async function moveItemFromAnalystQueueToSPEED(res = null, id, data) {
    await databaseRemove(null, "analysisQueue", id)
    databaseInsert(res, "SPEED", data)
}

async function moveItemFromModerationQueueToAnalystQueue(res = null, id, data) {
    await databaseRemove(null, "moderationQueue", id)
    databaseInsert(res, "analysisQueue", data)
}

async function moveItemFromModerationQueueToRejectedArticles(res = null, id, data) {
    await databaseRemove(null, "moderationQueue", id)
    databaseInsert(res, "rejectedArticles", data)
}

function getAllArticles(res = null) {
    if (res) {
        databaseFindAll(res, "SPEED")
    } else {
        return databaseFindAll(res, "SPEED")
    }
}

function getAllModerationQueue(res = null) {
    databaseFindAll(res, "moderationQueue")
}

function getAllAnalysisQueue(res = null) {
    databaseFindAll(res, "analysisQueue")
}

function getAllRejectedArticles(res = null) {
    databaseFindAll(res, "rejectedArticles")
}

app.use(express.static(path.join(__dirname, 'build')))

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

app.get('/getModerationQueue', (req, res) => {
    getAllModerationQueue(res)
})

app.get('/getAnalystQueue', (req, res) => {
    getAllAnalysisQueue(res)
})

app.get('/removeArticle', (req, res) => {
    var collection = req.query.collection
    var id = req.query.id
    databaseRemove(res, collection, id)
})

app.get('/insert', (req, res) => {
    var collection = req.query.collection
    var data = {};
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
        case 'test':
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
    var values = []
    Object.entries(data).forEach(([key, value]) => {
        values.push(value)
    });
    if (values.includes(undefined)) {
        res.send({status: 1})
        return;
    }
    databaseInsert(res, collection, data)
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 3000)

module.exports = {
    app: app,
    databaseFindAll: databaseFindAll,
};
