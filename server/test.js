let sql = require('./db.connector');

let config = {
		  host: 'localhost',
		  user: 'mns',
		  password: 'mns',
		  db: 'mns'
		};

let x = sql.connect(config.host, config.user, config.password, config.db);
sql.query(x);
sql.query(x);
