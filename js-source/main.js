'use strict';
let player,
	done = false,
	map,
	geocoder;

const mapApiKey = 'AIzaSyAfunSVDqMzVk4Bb5yplXxK9f2DnWXcWFk';

let beforePage = function () {},
	afterPage = function () {};


function isMobile () {
	if (document.documentElement.clientWidth <= 575) {
		return true;
	} else {
		return false;
	}
}
function fadeOut (el) {
	el.style.opacity = 1;

	let last = +new Date();
	let tick = () => {
		el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
		last = +new Date();

		if (+el.style.opacity > 0) {
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
		}
	};

	tick();
}

function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

/**
 		YouTube Video
  */
function onYouTubeIframeAPIReady() {
	let videoHeight = 0,
		videoWidth = 0;
	
	let height = document.documentElement.clientHeight,
		width = document.documentElement.clientWidth,
		originalRatio = 16/9;
	
	if (width / height >= originalRatio) {
		videoWidth = width;
		videoHeight = width / originalRatio;
	} else {
		videoHeight = height;
		videoWidth = height * originalRatio;
	}
	
	player = new YT.Player('video', {
//		height: '360',
		height: videoHeight,
//		width: '640',
		width: videoWidth,
		videoId: videoParam.id,
		
		playerVars: { 
			'autoplay': 1,
			'controls': 0,
			'showinfo': 0,
			'loop': 1,
			'rel': 0,
			'playlist': videoParam.id
			
		},
		events: {
			'onReady': onPlayerReady
//			'onStateChange': onPlayerStateChange
		}
	});
	window.addEventListener("resize", function() {
		videoResize();
	});
}

function onPlayerReady(event) {
	videoResize();
	event.target.playVideo();
	event.target.mute();
	pausePlayVideo();
	
	player.addEventListener('onStateChange', function (event) {
		if (event.data == 1) {
			fadeOut(document.querySelector('.video-cup'));
		}
	})
}

function videoResize () {
	let height = document.documentElement.clientHeight,
		width = document.documentElement.clientWidth,
		originalRatio = 16/9;
	let video = document.getElementById('video');
	
	if (width / height >= originalRatio) {
		player.setSize(width, width / originalRatio);
//		video.style.width = width;
//		video.style.height = width / originalRatio;
		video.style.marginTop = (height - (width / originalRatio)) / 2 + 'px';
		video.style.marginLeft = '';
	} else {
		player.setSize(height * originalRatio, height);
//		video.style.height = height;
//		video.style.width = height * originalRatio;
		video.style.marginLeft = (width - (height * originalRatio)) / 2 + 'px';
		video.style.marginTop = '';
	}
}

function pausePlayVideo() {
	if (document.querySelector('body').classList.contains('disabled-onepage-scroll') || !document.querySelector('body').classList.contains('onepage')) {
		window.addEventListener("scroll", function() {
			if (window.pageYOffset > document.documentElement.clientHeight + 50) {
				player.pauseVideo();
			} else {
				player.playVideo();
			}
		})
	} else {
		if(document.querySelector('body').classList.contains('viewing-page-1')) {
			player.playVideo();
		} else {
			player.pauseVideo();
		}
	}
	beforePage = function(index) {
		if (index == 1 && done) {
			player.playVideo();
				console.log('play');
			done = false;
		}
	}
	afterPage = function (index) {
		if (index !== 1 && !done) {
			player.pauseVideo();
				console.log('pause')
			done = true;
		}
	}
}

/**
 		Google maps
  */
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: mapParam.center,
		zoom: mapParam.zoom,
		styles: [
			  {
				"elementType": "labels.icon",
				"stylers": [
				  {
					"visibility": "off"
				  }
				]
			  },
			  {
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#616161"
				  }
				]
			  },
			  {
				"elementType": "labels.text.stroke",
				"stylers": [
				  {
					"color": "#f5f5f5"
				  }
				]
			  },
			  {
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#bdbdbd"
				  }
				]
			  },
			  {
				"featureType": "landscape.man_made",
				"elementType": "geometry.fill",
				"stylers": [
				  {
					"color": "#f2f2f2"
				  }
				]
			  },
			  {
				"featureType": "landscape.natural",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#f2f2f2"
				  }
				]
			  },
			  {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#f2f2f2"
				  }
				]
			  },
			  {
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#757575"
				  }
				]
			  },
			  {
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#9e9e9e"
				  }
				]
			  },
			  {
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#ffffff"
				  }
				]
			  },
			  {
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#757575"
				  }
				]
			  },
			  {
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#616161"
				  }
				]
			  },
			  {
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#9e9e9e"
				  }
				]
			  },
			  {
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#e5e5e5"
				  }
				]
			  },
			  {
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#eeeeee"
				  }
				]
			  },
			  {
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
				  {
					"color": "#46bcec"
				  }
				]
			  },
			  {
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
					"color": "#9e9e9e"
				  }
				]
			  }
			],
		mapTypeControl: false,
		scrollwheel: false,
		streetViewControl: false,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM
		}
	});
    geocoder = new google.maps.Geocoder();
	geocoder.geocode(
		{
			'address': mapParam.address
		},
		function (results, status) {
			if (status == 'OK') {
				map.setCenter(results[0].geometry.location);
				let marker = new google.maps.Marker({
					map: 		map,
					position: 	results[0].geometry.location,
					icon: 		mapParam.markerUrl
				});
			} else {
				console.error('Address not found', mapParam.address, status);
			}
		}
	);
}



NodeList.prototype.popup = function (options) {
	let defaults = {
			animationTime: 	1000,
			animationIn: 	'fadeIn',
			animationOut: 	'fadeOut',
		},
		settings = extend({}, defaults, options);
	
	if (this.length !== 0) {
		for (let i = 0; i < this.length; i++) {
			setPupup(this[i]);
		}
	}
	
	function extend (out) {
		out = out || {};
		
		for (let i = 1; i < arguments.length; i++) {
			if (!arguments[i])
				continue;
			
			for (let key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key))
					out[key] = arguments[i][key];
			}
		}
		
		return out;
	};
	
	function setPupup (el) {
		if (typeof el !== 'undefined') {
			el.addEventListener('click', function (e) {
				e.preventDefault();

				let popup = document.createElement('div');


				popup.classList.add('popup-container');

				if (el.hasAttribute('data-gallery')) {
					popup.innerHTML = setGalleryHtml(el);
				} else if (el.hasAttribute('data-vacancy')) {
					popup.innerHTML = setPopupHtml(el);
				};

				document.body.insertBefore(popup, document.body.children[0]);
				document.body.style.overflow = 'hidden';
				
				popup.classList.add('animated');
				popup.style.animationDuration = settings.animationTime + 'ms';
				popup.classList.add(settings.animationIn);

				if (popup.children[0].clientHeight > document.documentElement.clientHeight - 40) {
					popup.style.display = 'block';
				}
				popup.addEventListener('click', function (e) {
					if (e.target == popup || e.target.hasAttribute('data-popup-close')) {
						e.preventDefault();
						
						popup.classList.remove(settings.animationIn);
						popup.classList.add(settings.animationOut);
						
						setTimeout(function () {
							document.body.removeChild(popup);
							document.body.style.overflow = '';
						}, settings.animationTime);
					};
				});
			});
		};
	};
	
	function setPopupHtml (el) {
		return '<div class="vacancy-popup">\
					<button data-popup-close class="vacancy-popup__btn"></button>\
					<div class="vacancy-popup-head">\
						<div class="vacancy-popup-head__icon">' + el.querySelectorAll('.vacancy__icon')[0].innerHTML + '</div>\
						<div class="vacancy-popup-head__name">' + el.querySelectorAll('.vacancy__name')[0].innerHTML + '</div>\
						<div class="vacancy-popup-head__info">' + el.querySelectorAll('.vacancy__info')[0].innerHTML + '</div>\
						<div class="vacancy-popup-head__employment">' + el.querySelectorAll('.vacancy__employment')[0].innerHTML + '</div>\
						<div class="vacancy-popup-head__city">' + el.querySelectorAll('.vacancy__city')[0].innerHTML + '</div>\
						<a href="#" class="vacancy-popup-head__btn">откликнуться</a>\
					</div>\
					<div class="vacancy-popup-info">' + el.querySelectorAll('.vacancy__description')[0].innerHTML + '</div>\
				</div>';
	};
	
	function setGalleryHtml (el) {
		return '<div class="img-popup">\
					<button data-popup-close class="img-popup__btn"></button>\
					<img src="' + el.getAttribute('href') + '" alt="">\
				</div>';
	};
	
	return this;
 }
ready(function () {
	let firstScriptTag = document.getElementsByTagName('script')[0],
		tagGoogleMaps = document.createElement('script');
	
	tagGoogleMaps.src = "https://maps.googleapis.com/maps/api/js?key=" + mapApiKey + "&callback=initMap";
	firstScriptTag.parentNode.insertBefore(tagGoogleMaps, firstScriptTag);

	if (!isMobile()) {
		let tagYouTube = document.createElement('script')
		tagYouTube.src = "https://www.youtube.com/iframe_api";
		firstScriptTag.parentNode.insertBefore(tagYouTube, firstScriptTag);
	};
	
	
	document.querySelector('.header-navigation__btn').addEventListener('click', function () {
		openCloseMenu();
	});
	document.querySelector('.header-display__btn').addEventListener('click', function () {
		openCloseMenu();
	});
//	document.querySelector('.address__value').innerHTML = mapParam.address;
	
//	if (!isMobile()) {
		document.querySelectorAll('a[data-gallery]').popup();
//	}
	document.querySelectorAll('.vacancy').popup({
		animationTime: 1000,
		animationIn: 'fadeIn',
		animationOut: 'fadeOut',
	});
})

function openCloseMenu () {
	document.querySelector('.header-container').classList.toggle('view')	
}
$(document).ready(function () {
	let s = '';
	for (let i = 1; i <= $('[data-tab-link]').length; i++) {
		s += '<li class="tab-list-mobile__item" data-tab-link="' + i + '"></li>';
	}
	document.querySelector('.tab-list-mobile').innerHTML = s;
	$('[data-tab]').hide();
	$('[data-tab="1"]').show();
	$('[data-tab="1"]').find('.screenshots-slider').on('initialized.owl.carousel', function () {
		$(this).addClass('animated');
		$(this).addClass('fadeIn');
	})
	$('[data-tab-link="1"]').addClass('active');
	$('[data-tab-link]').click(function () {
		$('.active[data-tab-link]').removeClass('active');
		$(this).addClass('active');
		$('[data-tab]').hide();
		$('.screenshots-slider').trigger('stop.owl.autoplay');
		$('.screenshots-slider').removeClass('animated');
		$('.screenshots-slider').removeClass('fadeIn');
		$('[data-tab="' + $(this).attr('data-tab-link') + '"]').show();
		$('[data-tab="' + $(this).attr('data-tab-link') + '"]').find('.screenshots-slider').on('refreshed.owl.carousel', function(e) {
			$(this).trigger('play.owl.autoplay');
			$(this).addClass('animated');
			$(this).addClass('fadeIn');
		});
			
			
	})
	if (document.documentElement.clientWidth > 768) {
	
		$('body').addClass('onepage');
		$(".wrapper").onepage_scroll({
			sectionContainer: 	"section",
			loop: 				false,
			responsiveFallback: 769,
			
			beforeMove: function (index) {
							beforePage(index);
						},
			afterMove: 	function (index) {
							afterPage(index);
						}
		});
		
		$('a[href="#company"]').click(function (e) {
			e.preventDefault();
			$(".wrapper").moveTo(2);
		})
		$('a[href="#games"]').click(function (e) {
			e.preventDefault();
			$(".wrapper").moveTo(3);
		})
		$('a[href="#jobs"]').click(function (e) {
			e.preventDefault();
			$(".wrapper").moveTo(4);
		})
		$('a[href="#contact"]').click(function (e) {
			e.preventDefault();
			$(".wrapper").moveTo(5);
		})
		$('.section-hero-mouse-icon').click(function () {
			$(".wrapper").moveDown();
		})
	} else {
		$('.header-navigation__item').click(function (e) {
			e.preventDefault();
			openCloseMenu();
			$('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - 50}, 'slow');
		})
	}
	$('.screenshots-slider').owlCarousel({
		loop: 		true,
		nav: 		false,
		autoWidth: 	true,
		items: 		1,
		center: 	true,
		autoplay:	true,
		autoplayTimeout:	5000,
		autoplayHoverPause:	true,
		responsive: {
			0: {
				margin: 0
			},
			576: {
				margin: -32
			},
			769: {
				margin: -37
			},
			992: {
				margin: -58
			},
			1240: {
				margin: -80
			}
		}
	})
	
	function setSlider (name, param) {
		let trigger = isMobile();
		if (isMobile()) {
			$(name).addClass('owl-carousel');
			$(name).addClass('owl-theme');
			$(name).owlCarousel(param)
		} else {
			$(name).removeClass('owl-carousel');
			$(name).removeClass('owl-theme');
			$(name).trigger('destroy.owl.carousel');
		}
		
		$(window).resize(function () {
			if (isMobile() && !trigger) {
				trigger = true;
				
				$(name).addClass('owl-carousel');
				$(name).addClass('owl-theme');
				$(name).owlCarousel(param)
			} else if (!isMobile() && trigger) {
				trigger = false;
				
				$(name).removeClass('owl-carousel');
				$(name).removeClass('owl-theme');
				$(name).trigger('destroy.owl.carousel');
			}
		})
	}
	setSlider('.about-slider', {
		loop:	true,
		nav:	false,
		items:	1
	});
	setSlider('.vacancy-container', {
		loop:	true,
		nav:	false,
		items:	1
	})
})