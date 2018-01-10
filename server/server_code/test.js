let sql = require('./db.connector');
let p = require('./place');

let x = sql.connect();
let dados = [1,'','x','xx','xxx','5','xxxxx','xxxxxx','0','xxxxxxxxxx','','typee','facebook1','url1'];

sql.insertPlace(x,dados);

sql.getPlaces(x).then((data) => {
	//console.log(data);	
});
//console.log(places);