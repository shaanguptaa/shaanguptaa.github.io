const fs = require("fs");
const path = require("path");

const USERNAME = "shaanguptaa";

const featuredRepos = JSON.parse(
    fs.readFileSync("config/featured-repos.json", "utf8")
);

const OUTPUT_JSON = "data/projects.json";
const IMAGE_DIR = "images/projects";
const DEFAULT_IMAGE = "images/default-project.png";

async function getRepository(repoName) {
    console.log(`Fetching ${repoName}...`);

    const response = await fetch(
        `https://api.github.com/repos/${USERNAME}/${repoName}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch ${repoName}`);
    }

    return response.json();
}

async function downloadPreview(repo) {
    const extensions = ["png", "webp", "jpg", "jpeg"];

    for (const ext of extensions) {
        const url = `https://raw.githubusercontent.com/${USERNAME}/${repo.name}/${repo.default_branch}/preview.${ext}`;

        try {
            const response = await fetch(url);

            if (!response.ok) continue;

            const buffer = Buffer.from(await response.arrayBuffer());

            const imagePath = path.join(IMAGE_DIR, `${repo.name}.${ext}`);

            fs.writeFileSync(imagePath, buffer);

            console.log(`   ✓ preview.${ext}`);

            return imagePath.replace(/\\/g, "/");
        } catch (_) {}
    }

    console.log(`   ✗ No preview image found`);

    return DEFAULT_IMAGE;
}

async function main() {
    // Create images folder
    fs.mkdirSync(IMAGE_DIR, { recursive: true });

    // Remove previously generated images
    for (const file of fs.readdirSync(IMAGE_DIR)) {
        fs.unlinkSync(path.join(IMAGE_DIR, file));
    }

    const projects = [];

    for (const repoName of featuredRepos) {
        try {
            const repo = await getRepository(repoName);

            const image = await downloadPreview(repo);

            projects.push({
                id: repo.name,
                title: repo.name,
                description: repo.description ?? "",
                github: repo.html_url,
                homepage: repo.homepage,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated: repo.updated_at,
                topics: repo.topics ?? [],
                image: image
            });
        } catch (err) {
            console.warn(`Skipping ${repoName}: ${err.message}`);
        }
    }

    fs.writeFileSync(
        OUTPUT_JSON,
        JSON.stringify(projects, null, 4)
    );

    console.log("");
    console.log(`Generated ${projects.length} projects.`);
}

main().catch(console.error);