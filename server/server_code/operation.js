let operations = {
		"GetLocalizations": "getLocalizations",
		"GetPlaces": "getPlaces",
		"GetPlacesByLocal": "getPlacesByLocal",
		"GetEvents": "getEvents",
		"GetEventsByLocal": "getEventsByLocal",
		"GetEventsByPlace": "getEventsByPlace",

		"GetPrincipalImages": function  () {
			 console.log("cenas");
		}
}


module.exports = {

	exec: (args) =>{
			return operations[args];
	}

};
