/*
Helios by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var start =  function() {
		var settings = {

			// Carousels
			carousels: {
				speed: 3,
				fadeIn: true,
				fadeDelay: 250
			},

		};

		skel.breakpoints({
			wide: '(max-width: 1680px)',
			normal: '(max-width: 1280px)',
			narrow: '(max-width: 960px)',
			narrower: '(max-width: 840px)',
			mobile: '(max-width: 736px)'
		});

		$(function() {

			var	$window = $(window),
			$body = $('body');

			// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

			// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
			$(':last-child').addClass('last-child');

			// Fix: Placeholder polyfill.
			$('form').placeholder();

			// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

			// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				speed: 350,
				noOpenerFade: true,
				alignment: 'center'
			});

			// Scrolly links.
			$('.scrolly').scrolly();

			// Off-Canvas Navigation.

			// Navigation Button.
			$(
				'<div id="navButton">' +
				'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
			.appendTo($body);

			// Navigation Panel.
			$(
				'<div id="navPanel">' +
				'<nav>' +
				$('#nav').navList() +
				'</nav>' +
				'</div>'
			)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				target: $body,
				visibleClass: 'navPanel-visible'
			});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
			if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#navButton, #navPanel, #page-wrapper')
			.css('transition', 'none');

			// Carousels.
			$('.carousel').each(function() {

				var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

				var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

				// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.onVisible(function() {
						var	timerId,
						limit = $items.length - Math.ceil($window.width() / itemWidth);

						timerId = window.setInterval(function() {
							var x = $items.filter('.loading'), xf = x.first();

							if (x.length <= limit) {

								window.clearInterval(timerId);
								$items.removeClass('loading');
								return;

							}

							if (skel.vars.IEVersion < 10) {

								xf.fadeTo(750, 1.0);
								window.setTimeout(function() {
									xf.removeClass('loading');
								}, 50);

							}
							else
							xf.removeClass('loading');

						}, settings.carousels.fadeDelay);
					}, 50);
				}

				// Main.

				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				if (skel.vars.IEVersion < 9)
				$t._updatePos = function() { $reel.css('left', pos); };
				else
				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };


				// Forward.
				$forward
				.appendTo($t)
				.hide()
				.mouseenter(function(e) {
					timerId = window.setInterval(function() {
						pos -= settings.carousels.speed;

						if (pos <= rightLimit)
						{
							window.clearInterval(timerId);
							pos = rightLimit;
						}

						$t._updatePos();
					}, 10);
				})
				.mouseleave(function(e) {
					window.clearInterval(timerId);
				});

				// Backward.
				$backward
				.appendTo($t)
				.hide()
				.mouseenter(function(e) {
					timerId = window.setInterval(function() {
						pos += settings.carousels.speed;

						if (pos >= leftLimit) {

							window.clearInterval(timerId);
							pos = leftLimit;

						}

						$t._updatePos();
					}, 10);
				})
				.mouseleave(function(e) {
					window.clearInterval(timerId);
				});

				// Init.
				$window.load(function() {

					var timerId;

					reelWidth = $reel[0].scrollWidth;

					skel.on('change', function() {

						if (skel.vars.mobile) {

							$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
							$forward.hide();
							$backward.hide();

						}
						else {

							$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
							$forward.show();
							$backward.show();

						}

						$t._update();

					});

					$window.resize(function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

					$items.off('mouseover').on('mouseover', function (e) {
						window.clearInterval(timerId);
					});

					$items.off('mouseout').on('mouseout', function () {

						if (pos > rightLimit) {

							timerId = window.setInterval(function() {
								pos -= settings.carousels.speed;

								if (pos <= rightLimit)
								{
									window.clearInterval(timerId);
									pos = rightLimit;
								}

								$t._updatePos();
							}, 50);

						} else {
							timerId = window.setInterval(function() {
								pos += settings.carousels.speed;

								if (pos >= leftLimit) {

									window.clearInterval(timerId);
									pos = leftLimit;

								}

								$t._updatePos();
							}, 50);
						}

					});

				});

			});

		});
	};



	let x = document.getElementById("demo");

	function getLocation() {

		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(showPosition, showError);
		    } else { 
		        x.innerHTML = "Geolocation is not supported by this browser.";
		    }
		}

		function showPosition(position) {
		    x.innerHTML = "Latitude: " + position.coords.latitude + 
		    "<br>Longitude: " + position.coords.longitude;

		    console.log(x.innerHTML);
		}

		function showError(error) {
		    switch(error.code) {
		        case error.PERMISSION_DENIED:
		            x.innerHTML = "User denied the request for Geolocation."
		            break;
		        case error.POSITION_UNAVAILABLE:
		            x.innerHTML = "Location information is unavailable."
		            break;
		        case error.TIMEOUT:
		            x.innerHTML = "The request to get user location timed out."
		            break;
		        case error.UNKNOWN_ERROR:
		            x.innerHTML = "An unknown error occurred."
		            break;
		    }
		}



	var getPincipalImages = function() {

		getLocation();


		var promise = new Promise(function(resolve, reject) {

			var xmlhttp = new XMLHttpRequest();
			var url = "http://192.168.1.76:8080?GetPrincipalImages";

			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					$('#reel').append(this.responseText);
					resolve();
				}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();

		});

		return promise;

	};

	getPincipalImages().then(function() {
		start();
	});

})(jQuery);
