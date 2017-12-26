let Client = require('mariasql');
var lineReader = require('line-reader');



module.exports = {
	connect: (host, user, password, db) => {
		let i = 0;
		lineReader.eachLine('databaseconf.txt', function(line, last) {
					if(i==0){
						host=line;
					}
					if(i==1){
						user=line;
					}
					if(i==2){
						password=line;
					}
					if(i==3){
						db=line;
					}
					i++;
  					console.log(line); 
  			
		});
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


