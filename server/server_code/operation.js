let operations = {
		"GetLocalizations":  function  (sql, res, fs, map) {			
			sql.execQuery(sql.connect(), "select Localization_ID,City /*,Country,District*/ from Localization").then((data) => {
				
					let id = 0;
					let locals= {};

					
					while(data[id].City !== undefined) {
						locals[data[id].Localization_ID] = data[id].City;
						
						id++;
					}

					res.writeHead(200, {
						'Content-type':'text/html; charset=utf-8',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					res.end(JSON.stringify(locals));

			});
		},
		"GetPlaces": function  (sql, res, fs, map) {			
			sql.execQuery(sql.connect(), "select Place_ID,Localization_ID,Name /*Address,Rating,Description,Path_Galery,Visible_Flag,Contacts,Schedule,GPS,Type,Facebook,URL*/ from Place").then((data) => {
				
					let id = 0;
					let places={};

					
					while(data[id].Name !== undefined) {
						let place={};
						place[data[id].Localization_ID]=data[id].Name;
						places[data[id].Place_ID] = place;
						id++;
					}

					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					res.end(JSON.stringify(places));

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
		"GetFooter":  function  (sql, res, fs, map) {
					let imgHtml="";
					let footer = JSON.parse(fs.readFileSync('../../conf/footer.json', 'utf8'));
					for(id in footer){
						let imgFooter = Buffer.from(fs.readFileSync(footer[id])).toString('base64');
						imgHtml = imgHtml + '<div class="6u" style="width:33%; height:33%;"><a href="#" class="image fit"><img src="data:image/jpeg;base64,' + imgFooter + '" alt="" /></a></div>';		

					}

					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					
					res.end(imgHtml);
		},
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
