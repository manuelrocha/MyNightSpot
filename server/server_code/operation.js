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
			sql.execQuery(sql.connect(), "select Place_ID,Name,Description,Path_Galery /*Address, Rating, ,Visible_Flag,Contacts,Schedule, GPS, Localization_ID, Type, Facebook,URL*/ from Place where Localization_ID='"+map[0]+"'").then((data) => {
				
					let id = 0;
					let imgHtml='';

					while(data[id].Path_Galery !== undefined) {
						let imgData = Buffer.from(fs.readFileSync(data[id].Path_Galery+"/principal.jpg")).toString('base64');
						imgHtml = imgHtml + '<section class="spotlight"><div class="image"><img src="data:image/jpeg;base64,' + imgData + '" alt="" /></div><div class="content">';
						imgHtml = imgHtml + '<h2>' + data[id].Name + '</h2><p>' + data[id].Description + '</div></section>';
						id++;
					}

					res.writeHead(200, {
						'Content-type':'text/html',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					res.end(imgHtml);

			});
		},
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
		},

		GetEvents: function  (sql, res, fs, map) {	
			let query = "SELECT  e.Name, upper(date_format( e.Date, '%d %b')) AS \"EventDate\", e.Path_Flyer, p.Localization_Id, p.Name AS \"Place\" FROM Event e INNER JOIN Place p ON p.Place_Id = e.Place_Id";

			sql.execQuery(sql.connect(), query).then((data) => {
				let id = 0;
				let result = {};
				
				while(data[id].Path_Flyer !== undefined) {	
					result[id] = {
						eventName: data[id].Name,
						eventDate: data[id].EventDate,
						placeName: data[id].Place,
						imageData: Buffer.from(fs.readFileSync(data[id].Path_Flyer)).toString('base64')
					}

					id++;
				}

				res.writeHead(200, {
					'Content-type':'text/html',
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				});
					
				res.end(JSON.stringify(result));
			});
		}
}


module.exports = {

	exec: (args) =>{
			return operations[args];
	}

};
