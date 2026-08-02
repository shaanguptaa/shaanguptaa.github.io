const fs = require("fs");

const USERNAME = "shaanguptaa";

if (!fs.existsSync("config/featured-repos.json")) {
    throw new Error("config/featured-repos.json not found");
}

if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
}

async function getRepository(repoName) {
  const response = await fetch(
    `https://api.github.com/repos/${USERNAME}/${repoName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${repoName}`);
  }

  return await response.json();
}

async function main() {
  const featuredRepos = JSON.parse(
    fs.readFileSync("config/featured-repos.json", "utf8")
  );

  const projects = [];

  for (const repoName of featuredRepos) {
    console.log(`Fetching ${repoName}...`);
    try {
      const repo = await getRepository(repoName);

      projects.push({
        id: repo.name,
        title: repo.name,
        description: repo.description,
        github: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: repo.updated_at,
        created: repo.created_at,
        topics: repo.topics,
        image: `https://raw.githubusercontent.com/${USERNAME}/${repo.name}/${repo.default_branch}/preview.png`,
      });
    } catch (err) {
      console.warn(`Skipping "${repoName}" (${err.message})`);
    }
  }

  fs.writeFileSync("data/projects.json", JSON.stringify(projects, null, 4));

  console.log("projects.json updated successfully.");
}

main().catch(console.error);
