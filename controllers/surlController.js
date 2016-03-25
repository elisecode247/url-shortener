var surlModel = require('../models/surlModel');
var bodyParser = require('body-parser');
var validUrl = require('valid-url')


var screenJson = {
    original_url: "",
    short_url: ""
}

var createKey = function(cb) {
    var randomChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' [Math.floor(Math.random() * (62) + 0)];
    var char = surlModel.find({
        short_url: randomChar
    }, {
        short_url: 1
    }, function(err, results) {
        if (err) {
            throw err
        }
        else if (results == false || results == null || results == undefined) {
            cb(randomChar)
        }
        else {
            setTimeout(createKey(cb), 3000);
            cb("A" + randomChar)
        }
    })
}


module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/new/*', function(req, res) {
        console.log()
        // check to see if the url is valid
        // if valid, createshorturl and save to database and return json object
        // if invalid, return error json object
        var testkey = "U";
        var createKeyCallback = function(test) {
            testkey = test
            var newSurl = surlModel({
                original_url: req.params[0],
                short_url: testkey
            });

            newSurl.save(function(err) {
                if (err) throw err;
                screenJson.original_url = newSurl.original_url;
                screenJson.short_url = "glacial-bastion-56262/" + newSurl.short_url;
                res.end(JSON.stringify(screenJson));
            });
        }
        var validUrlCheck = validUrl.isWebUri(req.params[0]);
        if (validUrl) {
            createKey(createKeyCallback)
        }
        else {
            res.end(JSON.stringify({
                "error": "Wrong url format, make sure you have a valid protocol and real site."
            }));
        }
    });

    app.get('/:surl', function(req, res) {
        surlModel.find({
            short_url: req.params.surl
        }, function(err, surlfound) {
            if (err) {
                res.end(JSON.stringify({
                    "error": "This url is not on the database."
                }))
            }
            else {
                if (surlfound[0] !== undefined) {
                    res.redirect(surlfound[0].original_url);
                }
                else {
                    res.end(JSON.stringify({
                        "error": "This url is not on the database."
                    }))
                }
            }
        })
    });


};