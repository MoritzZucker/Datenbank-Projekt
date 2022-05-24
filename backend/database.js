var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'filmverleih',
    user: 'root', 
    password: 'root'
})

module.exports = connection;