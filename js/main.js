$(document).ready(function () {
  // particles.js initialize
  particlesJS.load("particles-js", "js/particles.json", function () {
    // console.log("callback - particles.js config loaded");
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
    navigationTooltips: ["Home", "About Me", "Projects", "Contact Me"],
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
    // fixedElements: '.section-heading',
    responsiveWidth: 0,
    // responsiveHeight: 0,

    // Custom selectors
    sectionSelector: ".section",
    // slideSelector: '.slide',

    lazyLoading: true,
    observer: true,
    credits: { enabled: false },

    // Events
    beforeLeave: function (origin, destination, direction, trigger) {
      $(".section-heading").css("opacity", 0);
    },
    onLeave: function (origin, destination, direction, trigger) {
      if (trigger === "menu") closeNav();
      // set section heading if not home
      // const sectionHeading = document.querySelector(".section-heading");
      // if (destination.index !== 0) {
      //   sectionHeading.innerHTML = destination.anchor;
      // } else {
      //   sectionHeading.innerHTML = "";
      // };
      if (destination.index !== 0)
        setTimeout(() => {
          $(".section-heading")
            .text(destination.anchor.replace("-", " "))
            .css("opacity", 1);
        }, 200);
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
    $(this).css("display", "none");
    $(".title").css("animation", "reveal 2s ease forwards");
  });

  // load avatar gif
  $(".avatar").attr("src", $(".avatar").attr("src").replace(".png", ".gif"));

  // show card images when loaded and also load gifs
  $(".card img.card-img:not(.card-img-hover)").each(function () {
    $(this).on("load", function () {
      $(this).parent().css("opacity", "1");
      $(this).css("opacity", "1");
      // var h = $(this).css("height");
      // $(this).parent().css("height", h);
      // const imgHover = document.createElement("img");
      // imgHover.setAttribute("class", "card-img-hover");
      // imgHover.setAttribute("src", $(this).attr("src").replace(".png", ".gif"));
      // $(this).after(imgHover);
    });
  });

  //  set initial height of card-text to 0
  // $(".card .card-img-overlay .card-text").css("height", 0);

  // //  set height of hovered card-text dynamically depending on the text-length

  // $(".card").hover(function () {
  //   // calculate height of card-text
  //   const textLen = parseInt($(this).find(".card-text").text().length);
  //   const lineHeight = parseInt($(this).find(".card-text").css("line-height").replace("px", ""));
  //   const fontsize = parseInt($(this).find(".card-text").css("font-size").replace("px", ""));
  //   const width = $(this).find(".card-text").width();

  //   const totalLen = textLen * fontsize;
  //   const numLines = Math.round(totalLen / width) - 1;
  //   const height1 = numLines * lineHeight;
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


// form submission
$("#form").submit(function (e) {
  e.preventDefault();
  const form = $(this);
  $(form).find("#form-submit").attr("disabled", true).html('<i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp; Sending...');
  const templateParams = {
    name: $(form).find("#form-name").val(),
    email: $(form).find("#form-email").val(),
    message: $(form).find("#form-message").val(),
  };
  
  emailjs.init("_L5ZJ-c5fB4pGBdkF");
  emailjs.send("default_service", "template_8qeq9g3", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      $(form).find("#form-submit").attr("disabled", false).html('<i class="fa-solid fa-paper-plane"></i>&nbsp; Send');
      $(form).find(".form-alert").html('<i class="fa-solid fa-check"></i>&nbsp; Email Sent').addClass("text-success").removeClass("text-danger").fadeIn(500).delay(3000).fadeOut(500);

    },
    function (error) {
      console.log("FAILED...", error);
      $(form).find("#form-submit").attr("disabled", false).html('<i class="fa-solid fa-paper-plane"></i>&nbsp; Send');
      $(form).find(".form-alert").html('<i class="fa-solid fa-xmark"></i>&nbsp; Couldn\'t Send Email').addClass("text-danger").removeClass("text-success").fadeIn(500).delay(3000).fadeOut(500); 
    }
  );
});
