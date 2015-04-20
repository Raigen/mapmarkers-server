/*eshint-env node*/
var express = require('express');

var app = express();
var markers = {
    '1': {
        id: '1',
        name: 'Zuhause',
        lat: '',
        lng: '',
        address: 'Fraenkelstr. 6, 22307 Hamburg',
        fav: true
    },
    '2': {
        id: '2',
        name: 'Ines Zuhause',
        lat: '',
        lng: '',
        address: 'An der Berner Au 71a, 23043 Hamburg',
        fav: true
    },
    '3': {
        id: '3',
        name: 'Arbiet',
        lat: '',
        lng: '',
        address: 'Pilatuspool 2, 23424 Hamburg',
        fav: false
    }
};

app.get('/markers', function (req, res) {
    'use strict';
    return res.end(JSON.stringify( markers ));
});
app.get('/markers/:id', function (req, res) {
    return res.end(JSON.stringify(markers[req.params.id]));
})

app.listen(8080);
