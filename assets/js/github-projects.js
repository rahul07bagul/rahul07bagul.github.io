// Configuration
const githubUsername = 'rahul07bagul'; // Replace with your GitHub username
const projectsContainerId = 'github-projects'; // HTML container where projects will be displayed
const maxProjects = 20; // Maximum number of projects to display, set to 0 for unlimited

// Main function to fetch GitHub repositories
async function fetchGitHubProjects() {
    try {
        const container = document.getElementById(projectsContainerId);
        
        if (!container) {
            console.error('Container element not found. Please create an element with id: ' + projectsContainerId);
            return;
        }
        
        // Display loading message
        container.innerHTML = '<div class="loading">Loading projects from GitHub...</div>';
        
        // Fetch GitHub repositories
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repositories = await response.json();
        
        // Filter out forks and limit number of projects if specified
        const filteredRepos = repositories
            .filter(repo => !repo.fork)
            .slice(0, maxProjects || repositories.length);
        
        // Clear loading message
        container.innerHTML = '';
        
        // Create the project grid
        const projectGrid = document.createElement('div');
        projectGrid.className = 'project-grid';
        container.appendChild(projectGrid);
        
        // Generate HTML for each project
        filteredRepos.forEach(repo => {
            // Create project card
            const card = document.createElement('div');
            card.className = 'project-card';
            card.onclick = () => window.open(repo.html_url, '_blank');
            
            // Fallback image
            const fallbackImage = 'images/github_logo.jpeg';
            
            // Create the HTML structure for the card
            card.innerHTML = `
                <div class="project-image">
                    <img src="${fallbackImage}" alt="${repo.name}" onerror="this.src='${fallbackImage}';" />
                </div>
                <div class="project-info">
                    <h3>${repo.name}</h3>
                    <p class="tech-stack">${getLanguageBadges(repo.language)}</p>
                    <p class="project-description">${repo.description || 'No description provided'}</p>
                </div>
            `;
            
            // Add to the grid
            projectGrid.appendChild(card);
        });
        
        // If no repositories found
        if (filteredRepos.length === 0) {
            container.innerHTML = '<div class="no-projects">No public repositories found.</div>';
        }
        
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        document.getElementById(projectsContainerId).innerHTML = 
            '<div class="error">Error loading projects. Please check the console for details.</div>';
    }
}

// Helper function to get known repository thumbnails
function getRepoThumbnail(repoName) {
    // Map repository names to their corresponding image paths
    const thumbnailMap = {
        'CPP_Challenge': 'gif/cppchallenge.gif',
        'Travelopedia': 'gif/travelopedia.gif',
        'SFDC_Streamlit_GPT': 'gif/SFDC-Analytics.gif',
        'Droidscope': 'https://github.com/rahul07bagul/Droidscope/blob/master/images/Final.png?raw=true'
        // Add more mappings as needed
    };
    
    return thumbnailMap[repoName];
}

// Helper function to generate language badges
function getLanguageBadges(language) {
    if (!language) return 'Not specified';
    
    // Color mapping for common languages
    const colorMap = {
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C#': '#178600',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Swift': '#ffac45',
        'Kotlin': '#A97BFF',
        'Rust': '#dea584',
        'Apex': '#1797c0'
    };
    
    const color = colorMap[language] || '#607d8b';
    
    return `<span class="language-badge" style="background-color: ${color}">${language}</span>`;
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);