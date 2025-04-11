const coaches = [
    // Current La Liga Coaches 2023/24
    {
        name: "Carlo Ancelotti",
        team: "Real Madrid",
        username: "@mrancelotti",
        verified: true
    },
    {
        name: "Xavi Hernández",
        team: "Barcelona",
        username: "@xavi",
        verified: true
    },
    {
        name: "Diego Simeone",
        team: "Atlético Madrid",
        username: "@simeone",
        verified: true
    },
    {
        name: "Michel",
        team: "Girona",
        username: "@michel8sanchez",
        verified: true
    },
    {
        name: "José Luis Mendilibar",
        team: "Sevilla",
        username: "@mendilibar_jl",
        verified: false
    },
    {
        name: "Manuel Pellegrini",
        team: "Real Betis",
        username: "@pellegrini",
        verified: true
    },
    {
        name: "Imanol Alguacil",
        team: "Real Sociedad",
        username: "@imanolalguacil",
        verified: true
    },
    {
        name: "José Bordalás",
        team: "Getafe",
        username: "@jose.bordalas",
        verified: true
    },
    {
        name: "Quique Setién",
        team: "Villarreal",
        username: "@quiquesetien",
        verified: true
    },
    {
        name: "Francisco Rodríguez",
        team: "Rayo Vallecano",
        username: "@francisco_rdz",
        verified: false
    },
    {
        name: "Jagoba Arrasate",
        team: "Osasuna",
        username: "@jarrasate",
        verified: false
    },
    {
        name: "Rubén Baraja",
        team: "Valencia",
        username: "@rubenbaraja",
        verified: true
    },
    {
        name: "García Pimienta",
        team: "Las Palmas",
        username: "@garciapimienta7",
        verified: true
    },
    {
        name: "Gaizka Garitano",
        team: "Almería",
        username: "@ggaritano",
        verified: false
    },
    {
        name: "Pacheta",
        team: "Villarreal",
        username: "@pacheta_oficial",
        verified: true
    },
    {
        name: "Luis García Plaza",
        team: "Deportivo Alavés",
        username: "@luisgarciaplaza",
        verified: true
    },
    {
        name: "Andoni Iraola",
        team: "Rayo Vallecano",
        username: "@andoni_iraola",
        verified: false
    },
    {
        name: "Sergio González",
        team: "Cádiz",
        username: "@sergiogonalez",
        verified: false
    },
    {
        name: "Javier Aguirre",
        team: "Mallorca",
        username: "@jaguirre.dt",
        verified: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadThemePreference();
    populateTeamFilter();
    renderCoaches(coaches);
});

function initializeApp() {
    // Event Listeners
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('teamFilter').addEventListener('change', handleSearch);
    document.getElementById('listViewBtn').addEventListener('click', () => toggleView('list'));
    document.getElementById('gridViewBtn').addEventListener('click', () => toggleView('grid'));
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('copyAllBtn').addEventListener('click', copyAllUsernames);
    document.getElementById('instagramBtn').addEventListener('click', openInstagram);
}

function renderCoaches(coachesToRender) {
    const container = document.getElementById('coachesGrid');
    container.innerHTML = coachesToRender.map(coach => `
        <div class="coach-card" data-team="${coach.team}">
            <div class="coach-info">
                <h3>${coach.name} ${coach.verified ? '<i class="fas fa-check-circle verified"></i>' : ''}</h3>
                <p class="team-name">${coach.team}</p>
                <p class="username">${coach.username}</p>
            </div>
            <button class="copy-btn" onclick="copySingleUsername('${coach.username}')">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    `).join('');
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const teamFilter = document.getElementById('teamFilter').value.toLowerCase();
    
    const filteredCoaches = coaches.filter(coach => {
        const matchesSearch = coach.name.toLowerCase().includes(searchTerm) || 
                            coach.username.toLowerCase().includes(searchTerm);
        const matchesTeam = !teamFilter || coach.team.toLowerCase() === teamFilter;
        return matchesSearch && matchesTeam;
    });
    
    renderCoaches(filteredCoaches);
}

function populateTeamFilter() {
    const teams = [...new Set(coaches.map(coach => coach.team))].sort();
    const select = document.getElementById('teamFilter');
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.toLowerCase();
        option.textContent = team;
        select.appendChild(option);
    });
}

async function copyAllUsernames() {
    const usernames = coaches.map(coach => coach.username).join(' ');
    try {
        await navigator.clipboard.writeText(usernames);
        showNotification('All usernames copied!', 'success');
    } catch (err) {
        showNotification('Failed to copy usernames', 'error');
    }
}

async function copySingleUsername(username) {
    try {
        await navigator.clipboard.writeText(username);
        showNotification(`Copied ${username}!`, 'success');
    } catch (err) {
        showNotification('Failed to copy username', 'error');
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}

function toggleView(viewType) {
    const container = document.getElementById('coachesGrid');
    const listBtn = document.getElementById('listViewBtn');
    const gridBtn = document.getElementById('gridViewBtn');
    
    container.className = `coaches-container ${viewType}-view`;
    listBtn.classList.toggle('active', viewType === 'list');
    gridBtn.classList.toggle('active', viewType === 'grid');
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    const icon = document.querySelector('#themeToggle i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

function loadThemePreference() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('#themeToggle i').className = 'fas fa-sun';
    }
}

function openInstagram() {
    window.open('https://www.instagram.com/', '_blank');
}
