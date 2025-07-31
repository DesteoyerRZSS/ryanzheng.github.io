const username = "DesteoyerRZSS"; // ← Replace with your GitHub username

// Fetch profile info (name, avatar, bio, etc.)
async function fetchProfile(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
        console.error("Failed to fetch profile");
        return;
    }
    const profile = await res.json();

    // Example: Render profile info
    const profileDiv = document.getElementById("bio");
    const avaDiv = document.getElementById("avatar");
    profileDiv.innerHTML = `
        <h1>${profile.name || profile.login}</h1>
        <p>${profile.bio || "No bio available."}</p>
        <p><strong>Location:</strong> ${profile.location || "N/A"}</p>
    `;
    avaDiv.innerHTML = `
        <img src="${profile.avatar_url}" alt="Avatar" width="80%">
    `;
    
}

// Fetch public repos (projects)
async function fetchRepositories(username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    if (!res.ok) {
        console.error("Failed to fetch repositories");
        return;
    }
    const repos = await res.json();

    // Filter: show only non-forks
    const filteredRepos = repos.filter(repo => !repo.fork);

    const projectsDiv = document.getElementById("projects");
    filteredRepos.forEach(repo => {
        const div = document.createElement("div");
        div.className = "project";
        div.innerHTML = `
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description"}</p>
            <p><strong>Language:</strong> ${repo.language || "N/A"}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        projectsDiv.appendChild(div);
    });
}

// Call both on load
document.addEventListener("DOMContentLoaded", () => {
    fetchProfile(username);
    fetchRepositories(username);
});