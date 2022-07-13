// nav-menu
$('#menu').on('click', function () {
    $('.bars', this).toggleClass('cross-icon');
    $('.nav-content').toggleClass('active');
});


// particles and one-scroll
$(document).ready(function() {
    particlesJS.load('particles-js', 'js/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
    
	$('#content').onepage_scroll({
        easing: "ease",
        keyboard: true,
        loop: false,
        pagination: true,
    });
});

