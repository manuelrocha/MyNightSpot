let sql = require('./db.connector');

let config = {
		  host: '',
		  user: '',
		  password: '',
		  db: ''
		};

let x = sql.connect(config.host, config.user, config.password, config.db);
sql.query(x);
sql.query(x);
