let sql = require('./db.connector');

sql.connect('localhost', 'mns', 'mns').then(() => {
	sql.query("select 1").then((result) => {
		console.log(result)
	}); 
});
