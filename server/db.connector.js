let mysql = require('mysql');

module.exports = {

	connect (host, user, password) {
    	return new Promise((resolve, reject) => {
			this.connection = mysql.createConnection({
				host: host,
				user: user,
				password: password
			});

			this.connection.connect((err) => {
				if (err) {
					reject();
					throw err;
				} else {
					resolve();
					console.log('Connected to DB ' + user + '@' + host);
				}
			});
		});
	},

	query (query) {
		console.log('Query: ' + query);
		return new Promise((resolve, reject) => {
			this.connection.query(query, (err, result) => {
				if (err) {
					reject
					throw err
				} else  {
					resolve(result);
				}
			});
		});
	},

	insert (table, values) {
		let query = 'INSERT INTO ' + TABLE + ' values(';

		values.each((value) => {
			query = query + value + ',';
		});

		query = query + ')';

		return 	this.query(query);
	}
};
