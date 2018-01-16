let operations = {
		"GetLocalizations": "getLocalizations",
		"GetPlaces": "getPlaces",
		"GetPlacesByLocal": "getPlacesByLocal",
		"GetEvents": "getEvents",
		"GetEventsByLocal": "getEventsByLocal",
		"GetEventsByPlace": "getEventsByPlace",

		"GetPrincipalImages": function  (sql) {
			sql.execQuery(sql, "select * from Event").then((data) => {
				console.log(data);
			});
		}
}


module.exports = {

	exec: (args) =>{
			return operations[args];
	}

};
