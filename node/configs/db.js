const mysql = require('mysql');

db_config = {
    "dbdriver": "mysql",
    "dbhost": "db",
    "dbusername": "tictactoe_user",
    "dbpassword": "tictactoe_pass",
    "db": "tictactoe",
    "dbport": 3306
}

db_connection = mysql.createConnection({
    host     : db_config.dbhost,
    user     : db_config.dbusername,
    password : db_config.dbpassword,
    database : db_config.db
});

module.exports = db_connection
