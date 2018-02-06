let operations = {
		"GetLocalizations": function  (sql, res, fs) {
			
			sql.execQuery(sql.connect(), "select City /*Localization_ID,Country,District*/ from Localization").then((data) => {
				
					let id = 0;
					let locals="";
					
					while(data[id].Path_Flyer !== undefined) {
						let local = data[id];
						locals = locals + '?' + local;
						id++;
					}
					console.log(locals);
					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					
					res.end(imgHtml);

			});
		},
		"GetPlaces": "getPlaces",
		"GetPlacesByLocal": "getPlacesByLocal",
		"GetEvents": "getEvents",
		"GetEventsByLocal": "getEventsByLocal",
		"GetEventsByPlace": "getEventsByPlace",

		"GetPrincipalImages": function  (sql, res, fs) {
			
			sql.execQuery(sql.connect(), "select * from Event").then((data) => {
				
					let id = 0;
					let imgHtml="";
					
					while(data[id].Path_Flyer !== undefined) {
						let imgData = Buffer.from(fs.readFileSync(data[id].Path_Flyer)).toString('base64');
						imgHtml = imgHtml + '<article><a href="#" class="image featured"><img src="data:image/jpeg;base64,' + imgData + '"/></a></article>';
						id++;
					}

					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					
					res.end(imgHtml);

			});
		}
}


module.exports = {

	exec: (args) =>{
			return operations[args];
	}

};
