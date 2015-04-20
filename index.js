/*eslint-env node*/
var express = require('express');
var Bluebird = require('bluebird');
var mongodb = Bluebird.promisifyAll(require('mongodb'));

var MongoClient = Bluebird.promisifyAll(mongodb.MongoClient);

var app = express();
var mongoClient = MongoClient.connectAsync('mongodb://localhost:27017/mapmarkers');

app.get('/markers', function (req, res) {
    'use strict';
    mongoClient.then(function (db) {
        return db.collection('markers').find({}).toArrayAsync();
    }).then(function (items) {
        res.write(JSON.stringify(items));
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        res.end();
    });
});
app.get('/markers/:id', function (req, res) {
    'use strict';
    var id = new mongodb.ObjectID(req.params.id);
    mongoClient.then(function (db) {
        return db.collection('markers').findOneAsync({_id: id});
    }).then(function (item) {
        res.write(JSON.stringify(item));
    }).catch(function (error) {
        console.log(error);
    }).finally(function () {
        res.end();
    });
});

app.listen(8080);
