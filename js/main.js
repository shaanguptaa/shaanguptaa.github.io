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

