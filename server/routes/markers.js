/*jslint node:true */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/CS411/server');

var Schema = mongoose.Schema;
var Marker = new Schema({
    username: String,
    title: String,
    description: String,
    type: String,
    votes: Number,
    latitude: Number,
    longitude: Number,
    pageid: String
    
});

var markers = mongoose.model('markers', Marker);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('use /markers/db');
});

router.post('/db', function (req, res, next) {
    var marker = new markers(req.body);
    marker.save(function (err, result) {
        if (err) {
            console.log('error!');
        } else {
            console.log(result);
            console.log(result._id);
            //res.json({message: 'marker saved'});
            res.json(result._id);
        }    
    });
});

router.get('/db', function(req, res, next) {
    markers.find({}, function (err, results) {
        res.json(results);
    });
});

// for show makers
router.get('/db/user', function(req, res, next) {
    markers.find({'type': {'$ne': "wiki"}}, function(err, result) {
        res.json(result);
    });
});

// for user result
router.get('/db/id/:id', function(req, res, next) {
    markers.find({'_id': req.params.id}, function(err, result) {
        res.json(result);
    });
});

// for wiki result
router.get('/db/pageid/:pageid', function(req, res, next) {
    markers.find({'pageid': req.params.pageid}, function(err, result) {
        res.json(result);
    });
});

router.delete('/db/all', function(req, res, next) {
    markers.find({}).remove(function(err) {
        if (err) {
            console.log("error when detele all db");
        } else {
            console.log("delete all db");
            res.json({message: 'all markers deleted'});
        }
    })
});

/*router.get('/db/:username', function(req, res, next) {
    markers.find({username: req.params.name}, function(err, results){
        res.json(results);
    });
});*/

module.exports = router;
