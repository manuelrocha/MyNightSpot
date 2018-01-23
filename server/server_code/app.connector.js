let http = require('http');
let fs = require('fs');
let sql = require('./db.connector');
let operation = require('./operation.js');

let functions = {
	writeStr: (res)  => {
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
		});

	  res.write('{"a":1}');
		res.end(); //end the response

	},

	writeImg: (res, img) => {
		res.writeHead(200, {
			'Content-type':'image/jpg',
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
		});

		fs.readFile(img, function (err, content) {
			res.end(content);
		});
	}
};


http.createServer(function (req, res) {

	//console.log(req.url);
	//functions.writeStr(res);

	let args = req.url.replace('/', '').split('?');
	operation.exec(args[1]).call(undefined, sql, res, fs);

	//sql.execQuery(query).then((data) => {
		//console.log(data);
	//});


	//functions.writeImg(res, "/home/mprocha/Project/MyNightSpot.git/trunk/web/images/1.jpg");
}).listen(8080); //the server object listens on port 8080
