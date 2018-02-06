let operations = {
		"GetLocalizations":  function  (sql, res, fs, map) {			
			sql.execQuery(sql.connect(), "select City /*Localization_ID,Country,District*/ from Localization").then((data) => {
				
					let id = 0;
					let locals="";

					
					while(data[id].City !== undefined) {
						let local = data[id].City;
						locals = locals + '?' + local;
						id++;
					}

					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					res.end(locals);

			});
		},
		"GetPlaces": function  (sql, res, fs, map) {			
			sql.execQuery(sql.connect(), "select Place_ID,Name /*Address,Rating,Description,Path_Galery,Visible_Flag,Contacts,Schedule,GPS,Localization_ID,Type,Facebook,URL*/ from Place").then((data) => {
				
					let id = 0;
					let places="";

					
					while(data[id].Name !== undefined) {
						let place = data[id].Place_ID+'|'+data[id].Name;
						places = places + '?' + place;
						id++;
					}

					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					res.end(places);

			});
		},
		"GetPlacesByLocal": function  (sql, res, fs, map) {			
			sql.execQuery(sql.connect(), "select Name /*Place_ID,Address, Rating, Description, Path_Galery,Visible_Flag,Contacts,Schedule, GPS, Localization_ID, Type, Facebook,URL*/ from Place where Localization_ID=(select Localization_ID from Localization where City='"+map[0]+"')").then((data) => {
				
					let id = 0;
					let places="";
 
					
					while(data[id].Name !== undefined) {
						let place = data[id].Name;
						places = places + '?' + place;
						id++;
					}

					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					res.end(places);

			});
		},
		"GetEvents": "getEvents",
		"GetEventsByLocal": "getEventsByLocal",
		"GetEventsByPlace": "getEventsByPlace",

		"GetPrincipalImages": function  (sql, res, fs, map) {			
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
