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
        await client.db("CISE_TEST").collection(collection).deleteOne({_id: new mongodb.ObjectId(String(id))}, function(err) {
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

async function moveItemFromAnalystQueueToRejectedArticles(res = null, id, data) {
    await databaseRemove(null, "analysisQueue", id)
    databaseInsert(res, "rejectedArticles", data)
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
    var data = JSON.parse(req.query.data)
    // Get search term from the request
    var collection = data.collection
    var row = data.row
    var searchPhrase = data.search
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

app.get('/getRejectedArticles', (req, res) => {
    getAllRejectedArticles(res)
})

app.get('/removeArticle', (req, res) => {
    var data = JSON.parse(req.query.data)
    var collection = data.collection
    var id = data._id
    databaseRemove(res, collection, id)
})

app.get('/moveArticleAnalystToReject', (req, res) => {
    var data = JSON.parse(req.query.data)
    var id = data._id
    delete data._id
    moveItemFromAnalystQueueToRejectedArticles(res, id, data)
})

app.get('/moveArticleModeratorToReject', (req, res) => {
    var data = JSON.parse(req.query.data)
    var id = data._id
    delete data._id
    moveItemFromModerationQueueToRejectedArticles(res, id, data)
})

app.get('/moveArticleModeratorToAnalyst', (req, res) => {
    var data = JSON.parse(req.query.data)
    var id = data._id
    delete data._id
    moveItemFromModerationQueueToAnalystQueue(res, id, data)
})

app.get('/insert', async (req, res) => {
    var data = JSON.parse(req.query.data)
    var collection = data.collection
    switch (collection) {
        case 'SPEED':
        case 'test':
            data = {
                title: data.title,
                doi: data.doi,
                publicationYear: Number(data.publicationYear),
                volume: Number(data.volume),
                number: Number(data.number),
                pages: Number(data.pages),
                journalName: data.journalName,
                summary: data.summary,
                practiceType: data.practiceType,
                authors: data.authors,
            }
            break;
        case 'rejectedArticles':
            data = {
                doi: data.doi,
                rejectName: data.rejectName,
                rejectTime: new Date(),
            }
            break;
        case 'moderationQueue':
            data = {
                doi: data.doi,
                submitDate: new Date(),
                submitterName: data.submitterName,
                submitterEmail: data.submitterEmail,
            }
            break;
        case 'analysisQueue':
            data = {
                doi: data.doi,
                submitDate: new Date(),
                submitterName: data.submitterName,
                submitterEmail: data.submitterEmail,
                moderatorName: data.moderatorName,
                moderatorEmail: data.moderatorEmail,
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
