(function($) {

		var getFooterImages = function() {

		var promise = new Promise(function(resolve, reject) {

			var xmlhttp = new XMLHttpRequest();
			var url = "http://192.168.1.76:8080?GetPlacesByLocal?1";

			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(this.responseText);
					$('#places').append(this.responseText);
					resolve();
				}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

		});

		return promise;

	};
	getFooterImages().then(function() {
		
	});



})(jQuery);