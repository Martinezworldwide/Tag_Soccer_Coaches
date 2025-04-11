const coaches = [
    "@michel8sanchez",
    "@rubenbaraja",
    "@pezzolanodt",
    "@rafabenitezrb",
    "@jose.bordalas",
    "@garciapimienta7",
    "@xavi",
    "@marcelinogarciatoral",
    "@luisgarciaplaza",
    "@simeone",
    "@pepe__mel",
    "@mrancelotti",
    "@_luis_garcia_10",
    "@alonsodt"
];

// Instagram caption limit
const INSTAGRAM_LIMIT = 2200;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderCoaches(coaches);
    setupEventListeners();
    updateCharacterCount();
});

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = coaches.filter(username => 
                username.toLowerCase().includes(searchTerm)
            );
            renderCoaches(filtered);
            updateCharacterCount();
        });
    }

    // Copy all usernames
    const copyAllBtn = document.getElementById('copyAllBtn');
    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', copyAllUsernames);
    }

    // Open Instagram
    const instagramBtn = document.getElementById('instagramBtn');
    if (instagramBtn) {
        instagramBtn.addEventListener('click', openInstagram);
    }
}

function renderCoaches(coachesToRender) {
    const container = document.getElementById('coachesList');
    if (container) {
        container.innerHTML = coachesToRender.map(username => `
            <div class="coach-item">
                <span class="username">${username}</span>
                <button class="copy-btn" onclick="copySingleUsername('${username}')">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');
    }
}

function copyAllUsernames() {
    const text = coaches.join(' ');
    copyToClipboard(text, 'All usernames copied!');
}

function copySingleUsername(username) {
    copyToClipboard(username, `Copied ${username}!`);
}

function copyToClipboard(text, successMessage) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotification(successMessage, 'success');
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.opacity = '1';
        
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 2000);
    }
}

function updateCharacterCount() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const filtered = coaches.filter(username => 
        username.toLowerCase().includes(searchTerm)
    );
    const totalLength = filtered.join(' ').length;
    const remaining = INSTAGRAM_LIMIT - totalLength;
    
    const counter = document.getElementById('characterCounter');
    if (counter) {
        counter.textContent = `Characters: ${totalLength} (${remaining} remaining)`;
        counter.className = `character-counter ${remaining < 0 ? 'error' : ''}`;
    }
}

function openInstagram() {
    window.open('https://www.instagram.com/', '_blank');
}
