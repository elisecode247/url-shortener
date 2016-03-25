var configValues = require('../.git/.gitignore/config')

module.exports = { 
    getDbConnectionString: function(){ 
        return 'mongodb://' + configValues.uname + ":" + configValues.pwd + '@ds025429.mlab.com:25429/shortenedurls'
    }
}