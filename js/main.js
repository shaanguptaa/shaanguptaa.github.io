$(document).ready(function () {
  // particles.js initialize
  particlesJS.load("particles-js", "js/particles.json", function () {
    console.log("callback - particles.js config loaded");
  });

  // onepage-scroll initialize
  // $('#content').onepage_scroll({
  //     easing: "ease",
  //     keyboard: true,
  //     loop: false,
  //     pagination: true,
  // });

  // fullpage.js initialize

  let myFullpage = new fullpage("#main", {
    licenseKey: "gplv3-license",

    // Navigation
    menu: "#menu",
    lockAnchors: false,
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: ["Home", "secondSlide", "thirdSlide", "fourthSlide"],
    showActiveTooltip: true,
    // slidesNavigation: false,
    // slidesNavPosition: 'bottom',

    // Scrolling
    css3: true,
    scrollingSpeed: 800,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 600,
    scrollBar: false,
    // easing: "swing",
    easingcss3: "ease",
    // loopBottom: false,
    // loopTop: false,
    // loopHorizontal: true,
    // continuousVertical: false,
    // continuousHorizontal: false,
    // scrollHorizontally: false,
    // interlockedSlides: false,
    // dragAndMove: false,
    // offsetSections: false,
    // resetSliders: false,
    // fadingEffect: false,
    // normalScrollElements: '#element1, .element2',
    scrollOverflow: true,
    // scrollOverflowMacStyle: false,
    // scrollOverflowReset: false,
    touchSensitivity: 15,
    bigSectionsDestination: top,

    // Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: false,

    // Design

    // controlArrows: true,
    // controlArrowsHTML: [
    //     '<div class="fp-arrow"></div>',
    //     '<div class="fp-arrow"></div>'
    // ],
    verticalCentered: true,
    // sectionsColor : ['#ccc', '#fff'],
    paddingTop: "3em",
    paddingBottom: "10px",
    // fixedElements: '#header, #footer',
    // fixedElements: '.header, #footer',
    responsiveWidth: 0,
    // responsiveHeight: 0,

    // Custom selectors
    sectionSelector: ".section",
    // slideSelector: '.slide',

    lazyLoading: true,
    observer: true,
    credits: { enabled: false },

    // Events
    beforeLeave: function (origin, destination, direction, trigger) {},
    onLeave: function (origin, destination, direction, trigger) {
      if (trigger === "menu") closeNav();
    },
    afterLoad: function (origin, destination, direction, trigger) {},
    afterRender: function () {},
    afterResize: function (width, height) {},
    afterReBuild: function () {},
    afterResponsive: function (isResponsive) {},
    afterSlideLoad: function (
      section,
      origin,
      destination,
      direction,
      trigger
    ) {},
    onSlideLeave: function (
      section,
      origin,
      destination,
      direction,
      trigger
    ) {},
    onScrollOverflow: function (section, slide, position, direction) {},
  });
});

window.addEventListener("load", function () {
  // remove loader
  $(".loader-wrapper, .loading").fadeOut(1000, function () {
    // $(this).hide();
    $(this).css("display", "none");
    $(".title").css("animation", "reveal 2s ease forwards");
  });

  $(".avatar")
    .attr("src", $(".avatar").attr("data-source"))
    .on("load", function () {
      $(this).removeAttr("data-source");
      //   $(".avatar").addClass("loaded");
      //   console.log("avatar loaded", $(this));
    });
});

// nav-menu toggle
$("#menu-icon").on("click", toggleNav);

function toggleNav() {
  $(".bars", ".nav").toggleClass("cross-icon");
  $(".nav-content").toggleClass("active");
}

function closeNav() {
  $(".bars", ".nav").removeClass("cross-icon");
  $(".nav-content").removeClass("active");
}

// fn to close nav-menu on ESC key
document.onkeydown = function (e) {
  if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
    toggleNav();
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
};
