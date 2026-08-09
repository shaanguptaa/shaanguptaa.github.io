async function loadResume() {
  const placeholders = document.getElementsByClassName("resume-placeholder");
  const resumeFileName = "Sahil_Gupta_Resume.pdf";
  const resumePath = "resume/" + resumeFileName;

  const resume = `
        <div class="resume resume-menu outline-btn-effect" title="View My Resume">
            <div class="resume-btn-group">

                <!-- Primary Action (Preview) -->
                <a href="${resumePath}" target="_blank" class="btn resume-btn" title="Preview Resume">
                    <i class="fa-solid fa-file-lines"></i>
                    &nbsp; My Resume
                </a>

                <a href="${resumePath}" class="btn resume-download" download="${resumeFileName}">
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
        </div>
    `;

    const resumeMobileHtml = `
        <div class="mobile-resume">

            <div class="resume-actions">
            <a href="${resumePath}" target="_blank" class="resume-action outline-btn-effect">
                <i class="fa-solid fa-eye"></i>
                <span>View Resume</span>
            </a>

            <a href="${resumePath}" download="${resumeFileName}" class="resume-action outline-btn-effect">
                <i class="fa-solid fa-download"></i>
                <span>Download</span>
            </a>
            </div>

            <div class="mobile-resume-btn btn outline-btn-effect" aria-label="Resume Options" title="Resume Options">
            <i class="fa-solid fa-file-lines"></i>
            Resume
            </div>

        </div>
    `;

    for (const placeholder of placeholders) {
        placeholder.innerHTML = resume;
    }

    $(".resume-mobile-placeholder").html(resumeMobileHtml);

    let navResume = document.querySelector("#resume-nav-placeholder .resume-btn");
    navResume.innerHTML = navResume.innerHTML.replace("My Resume", "Resume");
    
}

document.addEventListener("DOMContentLoaded", loadResume);

// Resume Dropdown
// Resume Popover
$(function () {

    const $resumeMenu = $(".resume-menu");
    const $resumePopover = $(".resume-popover");
    const $resumeToggle = $(".resume-toggle");

    // Toggle popover
    $resumeToggle.on("click", function (e) {
        e.stopPropagation();
        const index = $resumeToggle.index($(this)); 
        $resumeMenu.eq(index).toggleClass("open");
        $resumePopover.eq(index).toggleClass("show");
    });

    // Close when clicking outside
    $(document).on("click", function () {
        $resumeMenu.removeClass("open");
        $resumePopover.removeClass("show");
    });

    // Prevent closing when clicking inside popover
    $resumePopover.on("click", function (e) {
        e.stopPropagation();
    });

    // Close after selecting an option
    $resumePopover.find("a").on("click", function () {
        $resumeMenu.removeClass("open");
        $resumePopover.removeClass("show");
    });

    const $resumeButton = $('.mobile-resume-btn');
    const $mobileResume = $('.mobile-resume');

    $resumeButton.on('click', function () {
        $mobileResume.toggleClass('open');
    });
});