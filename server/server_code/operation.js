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

function Operations (args){
		return operations[args];
}

module.exports = Operations;
