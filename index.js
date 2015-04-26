/*eslint-env node*/
var express = require('express');
var Bluebird = require('bluebird');
var mongodb = Bluebird.promisifyAll(require('mongodb'));

var MongoClient = Bluebird.promisifyAll(mongodb.MongoClient);

var app = express();
var mongoClient = MongoClient.connectAsync(process.env.MONGOLAB_URI);
var collectionPromise = mongoClient.then(function (db) {
    'use strict';
    return db.collection('markers');
});

app.get('/markers', function (req, res) {
    'use strict';
    collectionPromise.then(function (collection) {
        return collection.find({}).toArrayAsync();
    }).then(function (items) {
        var result = {markers: items};
        res.write(JSON.stringify(result));
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        res.end();
    });
});
app.get('/markers/:id', function (req, res) {
    'use strict';
    var id = new mongodb.ObjectID(req.params.id);
    collectionPromise.then(function (collection) {
        return collection.findOneAsync({_id: id});
    }).then(function (item) {
        res.write(JSON.stringify(item));
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        res.end();
    });
});

app.post('/markers/', function (req, res) {
    'use strict';
    var data = req.body.data;
    collectionPromise.then(function (collection) {
        return collection.insertOneAsync(data);
    }).then(function () {
        res.status(201);
        res.write(data);
    }).catch(function (error) {
        res.status(500);
        res.write(error.message);
    }).finally(function () {
        res.end();
    });
});

app.put('/markers/:id', function (req, res) {
    'use strict';
    var id = new mongodb.ObjectID(req.params.id);
    var data = req.body.data;
    collectionPromise.then(function (collection) {
        return collection.updateOneAsync({_id: id}, data);
    }).then(function () {
        res.status(200);
        res.write(data);
    }).catch(function (error) {
        res.status(500);
        res.write(error.message);
    }).finally(function () {
        res.end();
    });
});

app.listen(8080);
