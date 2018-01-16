let Client = require('mariasql');
let fs = require('fs');
let p = require('./place');


module.exports = {
	connect: () => {

		let dbConf = JSON.parse(fs.readFileSync('databaseconf.json', 'utf8'));

		let client  =new Client({
		  host: dbConf.host,
		  user: dbConf.user,
		  password: dbConf.password,
		  db: dbConf.dataBase
		});

		return client;
	},

	insertPlace: (client, place) => {

		client.query('insert into Place (Localization_ID,Place_ID,Name,Address,Contacts,Rating,Description,Path_Galery,Visible_Flag,Schedule,GPS,Type,Facebook,URL) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',place,  function(err, rows) {
		  if(err)
		  	throw err;
		  console.log('Inseriu o cliente ',place[0]);
		});

		client.end();
	},

	execQuery: (client, query) => {
		return new Promise((resolve, reject) => {
			let i =0;

			client.query(query,
    		function(err, rows) {

	 	 			if (err) {
	    			reject();
					}

	    		let array = [];
	    		for (i in rows) {
						array.push(rows[i]);
	    		}

    			resolve(array);
			});

		client.end();
		});
	}
}
