var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var surlsSchema = new Schema({
    original_url: String,
    short_url: String,
});

var surlsModel = mongoose.model('surls', surlsSchema);

module.exports = surlsModel;