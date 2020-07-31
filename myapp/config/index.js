var configValues = require("./config.json")

module.exports ={
    getDbConnectionString : function(){
        return `mongodb+srv://${configValues.usename}:${configValues.password}@cluster0-p14ob.mongodb.net/${configValues.dbname}?retryWrites=true&w=majority`
    }
}
