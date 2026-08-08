async function loadProjects() {
  const container = document.getElementById("projects-container");

  try {
    // Fetch all public projects in one request
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error("Unable to load projects");
    }

    const projects = await response.json();

    let projectHTML = "";

    // Generate cards in the same order as projects-data.js
    projects.forEach((project, index) => {
      
      const liveButton = project.homepage?.trim()
        ? `
            <a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="outline-btn live-btn">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>Live Demo</span>
            </a>`
        : "";

      const topicBadges = (project.topics || [])
        .map((topic) => `<span class="badge">${formatTopic(topic)}</span>`)
        .join("");

      projectHTML += `
          <div class="project-showcase ${index % 2 ? "reverse" : ""}">
            <div class="project-content">
              <div class="project-header">
                <div class="project-number">${String(index + 1).padStart(2, "0")}</div>
                <h2 class="project-title">${project.title}</h2>
                <div class="project-divider"></div>
              </div>

              <div class="project-preview">
                <div class="browser-window">
                  <div class="browser-top">
                    <span></span>
                    <span></span>
                    <span></span>
                    <div class="browser-title">${project.title}</div>
                  </div>
                  <img src="${project.image}" loading="lazy" alt="${project.title}" onerror="this.src='images/default-project.png';">
                </div>
              </div>

              <div class="project-body">
                <p class="project-description">${project.description || ""}</p>
                <p class="project-updated">Updated ${formatDate(project.updated)}</p>
                <div class="project-tech">${topicBadges}</div>
                <div class="project-buttons">
                  ${liveButton}
                  <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="outline-btn">
                    <i class="fa-brands fa-github"></i>
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
    });
    container.innerHTML = projectHTML;
  } catch (error) {
    console.error("Error loading projects:", error);

    container.innerHTML = `
            <div class="text-center text-white">
                Unable to load projects.
            </div>
        `;
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);

const TOPIC_LABELS = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  html: "HTML",
  css: "CSS",
  cpp: "C++",
  csharp: "C#",
  springboot: "Spring Boot",
  "spring-boot": "Spring Boot",
  nodejs: "Node.js",
  nextjs: "Next.js",
  reactjs: "React",
  redis: "Redis",
  elasticsearch: "Elasticsearch",
};

function formatTopic(topic) {
  return (
    TOPIC_LABELS[topic.toLowerCase()] ??
    topic
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function formatDate(updated) {
    if (!updated) return "Few Months Ago";

    const date = new Date(updated);

    if (isNaN(date.getTime())) return "Few Months Ago";

    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
    });
}
