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
    for (const project of projects) {
      
      const liveButton = project.homepage?.trim()
        ? `
                <a href="${project.homepage}" target="_blank" class="btn btn-sm">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>&nbsp; View Project
                </a>`
        : "";

      const topicBadges = (project.topics || [])
        .map((topic) => `<span class="badge">${formatTopic(topic)}</span>`)
        .join("");

      projectHTML += `
            <div class="card bg-dark text-white" id="${project.id}">
                <img class="card-img" src="${project.image}" loading="lazy" alt="${project.description || project.title || project.id}"
                    onerror="this.src='images/default-project.png';" >
                <div class="card-links">
                    ${liveButton}
                    <a href="${project.github}" target="_blank" class="btn btn-sm">
                        <i class="fa-solid fa-code"></i>&nbsp; Source Code
                    </a>
                </div>
                <div class="card-img-overlay">
                    <h5 class="card-title">${project.title || project.id}</h5>
                    <p class="card-subtitle badges">${topicBadges}</p>
                    <p class="card-text">${project.description || ""}</p>
                </div>
            </div>
            `;
    }
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
