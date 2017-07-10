var player,
	videoId = 'CRhJLTA-Xpk',
	done = false,
	map,
	mapApiKey = 'AIzaSyAfunSVDqMzVk4Bb5yplXxK9f2DnWXcWFk',
	mapCenter = {
			lat: -34.397,
			lng: 150.644
		};

var beforePage = function () {},
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

	var last = +new Date();
	var tick = function() {
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
	var videoHeight = 0,
		videoWidth = 0;
	
	var height = document.documentElement.clientHeight,
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
		videoId: videoId,
		
		playerVars: { 
			'autoplay': 1,
			'controls': 0,
			'showinfo': 0,
			'loop': 1,
			'rel': 0,
			'playlist': videoId
			
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
	var height = document.documentElement.clientHeight,
		width = document.documentElement.clientWidth,
		originalRatio = 16/9;
	var video = document.getElementById('video');
	
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
		center: mapCenter,
		zoom: 8
	});
}
ready(function () {
	var firstScriptTag = document.getElementsByTagName('script')[0],
		tagGoogleMaps = document.createElement('script');
	
	tagGoogleMaps.src = "https://maps.googleapis.com/maps/api/js?key=" + mapApiKey + "&callback=initMap";
	firstScriptTag.parentNode.insertBefore(tagGoogleMaps, firstScriptTag);

	if (!isMobile()) {
		var tagYouTube = document.createElement('script')
		tagYouTube.src = "https://www.youtube.com/iframe_api";
		firstScriptTag.parentNode.insertBefore(tagYouTube, firstScriptTag);
	}
	
	
	document.querySelector('.header-navigation__btn').addEventListener('click', function () {
		openCloseMenu();
	})
	document.querySelector('.header-display__btn').addEventListener('click', function () {
		openCloseMenu();
	})
})

function openCloseMenu () {
	document.querySelector('.header-container').classList.toggle('view')	
}

$(document).ready(function () {
	
	if (!isMobile()) {
		$('body').addClass('onepage');
		$(".wrapper").onepage_scroll({
			sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
		//	easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
		//									// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		//	animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
	//		pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
			updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
			loop: false,                    // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
			beforeMove: function (index) {
				beforePage(index);
			},
			afterMove: function (index) {
				afterPage(index);
			},
		//	keyboard: true,                  // You can activate the keyboard controls
			responsiveFallback: 769,       // You can fallback to normal page scroll by defining the width of the browser in which
											// you want the responsive fallback to be triggered. For example, set this to 600 and whenever
											// the browser's width is less than 600, the fallback will kick in.
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
		$('.header-navigation__item').click(function () {
			openCloseMenu();
		})
	}
		
	$('.screenshots-slider').owlCarousel({
		loop: 		true,
		nav: 		false,
		autoWidth: 	true,
//		navText: [ '<img src="img/arrow-left.svg" alt="Влево">', '<img src="img/arrow-right.svg" alt="Вправо">' ],
		items: 		1,
		center: 	true,
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
		var trigger = isMobile();
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