module.exports = { 
    getDbConnectionString: function(){ 
        return process.env.MONGOHQ_URL
    }
}