var player,
	done = false;

function isMobile () {
	if ($(window).width() <= 575) {
		return true;
	} else {
		return false;
	}
}

function videoResize () {
	var height = $(window).height(),
		width = $(window).width(),
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

function onYouTubeIframeAPIReady() {
	var videoHeight = 0,
		videoWidth = 0;
	
	var height = $(window).height(),
		width = $(window).width(),
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
		videoId: 'CRhJLTA-Xpk',
		
		playerVars: { 
			'autoplay': 1,
			'controls': 0,
			'showinfo': 0,
			'loop': 1,
			'rel': 0,
			'playlist': 'CRhJLTA-Xpk'
			
		},
		events: {
			'onReady': onPlayerReady
//			'onStateChange': onPlayerStateChange
		}
	});
	
	$(window).resize(function () {
		videoResize();
	})
//	pausePlayVideo();
//	$(window).scroll(function () {
//	})
}

function onPlayerReady(event) {
	event.target.playVideo();
	event.target.mute();
	videoResize();
	pausePlayVideo();
	
	player.addEventListener('onStateChange', function (event) {
		if (event.data == 1) {
			$('.video-cup').fadeOut();
		}
	})
}

var beforePage = function () {},
	afterPage = function () {};

function pausePlayVideo() {
	
	if ($('body').hasClass('disabled-onepage-scroll')) {
		if ($(window).scrollTop() > $(window).height() + 50) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	} else {
		if($('body').hasClass('viewing-page-1')) {
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

$(document).ready(function () {
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";

	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	
	document.querySelector('.header-navigation__btn').addEventListener('click', function () {
		document.querySelector('.header-container').classList.toggle('view')	
	})
	document.querySelector('.header-display__btn').addEventListener('click', function () {
		document.querySelector('.header-container').classList.toggle('view')	
	})
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
			responsiveFallback: 546,       // You can fallback to normal page scroll by defining the width of the browser in which
											// you want the responsive fallback to be triggered. For example, set this to 600 and whenever
											// the browser's width is less than 600, the fallback will kick in.
		});
	}
//	setTimeout(function () {
//		test = function () {
//			console.log('second');
//		}
//	}, 5000)
//	setInterval(function() {
//		test();
//	}, 1000)
	$('.section-hero-mouse-icon').click(function () {
		$(".wrapper").moveDown();
	})
		
	$('.screenshots-slider').owlCarousel({
		loop:true,
//		stagePadding: 310,
		nav:false,
//		autoWidth:true,
//		navText: [ '<img src="img/arrow-left.svg" alt="Влево">', '<img src="img/arrow-right.svg" alt="Вправо">' ],
		items:1,
//		margin: 20,
		center: true
//		animateOut: 'fadeOut',
//		mouseDrag: false,
//		animateIn: 'flipInX',
//		autoplay:true,
//		autoplayTimeout:5000,
//		autoplayHoverPause:true
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
		loop:true,
		nav:false,
		items:1
	});
	setSlider('.vacancy-container', {
		loop:true,
		nav:false,
		items:1
	})
//	$('.vacancy-container').owlCarousel({
//		loop:true,
////		stagePadding: 310,
//		nav:true,
////		autoWidth:true,
////		navText: [ '<img src="img/arrow-left.svg" alt="Влево">', '<img src="img/arrow-right.svg" alt="Вправо">' ],
//		items:1,
//	})
})