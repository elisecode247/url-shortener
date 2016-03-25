var surl = require('../models/surlModel');

module.exports = function(app){
    app.get('/api/setupsurls', function(req,res){
        // seed database
        var starterSurls = [
            { "original_url":"http://www.google.com", 
                "short_url":"ha" 
                
            }
        ];
        surl.create(starterSurls, function(err,results){
            if (err) throw err;
            res.send(results);
        })
    })
}