let Client = require('mariasql');


module.exports = {
	connect: (host, user, password, db) => {
		let client  =new Client({
		  host: host,
		  user: user,
		  password: password,
		  db: db
		});

		return client;
	},

	query: (client) => {

		client.query('select * from Event', function(err, rows) {
		  if (err)
		    throw err;
		  console.dir(rows);
		});

		client.end();
	}
}


