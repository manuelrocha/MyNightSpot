let operations = {
		"GetLocalizations": "getLocalizations",
		"GetPlaces": "getPlaces",
		"GetPlacesByLocal": "getPlacesByLocal",
		"GetEvents": "getEvents",
		"GetEventsByLocal": "getEventsByLocal",
		"GetEventsByPlace": "getEventsByPlace",

		"GetPrincipalImages": function  (sql, res, fs) {
			
			sql.execQuery(sql.connect(), "select * from Event").then((data) => {
				
					let id = 0;
					let imgs = [];
					
					while(data[id].Path_Flyer !== undefined) {
						imgs.push(data[id].Path_Flyer);
						id++;
					}

				res.writeHead(200, {
					'Content-type':'image/jpg',
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				});

				fs.readFile(imgs[0], function (err, content) {
					res.end(content);
				});					

			});
		}
}


module.exports = {

	exec: (args) =>{
			return operations[args];
	}

};
