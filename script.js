const coaches = {
    "La Liga": [
        "@xavi",
        "@simeone",
        "@marcelinogarciatoral",
        "@pezzolanodt",
        "@rafabenitezrb",
        "@jose.bordalas",
        "@garciapimienta7",
        "@luisgarciaplaza",
        "@pepe__mel",
        "@mrancelotti",
        "@_luis_garcia_10",
        "@alonsodt",
        "@michel8sanchez",
        "@rubenbaraja"
    ],
    "Premier League": [
        "@pepguardiola",
        "@jurgenklopp",
        "@mikelarteta",
        "@eriktenhag",
        "@unaiemery",
        "@marcos_silva",
        "@andoni_iraola",
        "@eddiehowe",
        "@thomasfrank",
        "@moyes_david",
        "@nunoespiritosanto",
        "@vincentkompany",
        "@robertdepierro",
        "@chriswilder"
    ],
    "Bundesliga": [
        "@thomastuchel",
        "@xabi_alonso",
        "@edinterzic",
        "@sebastianhoeness",
        "@dino.toppmoller",
        "@bo_svensson",
        "@jessthorup",
        "@gerardoseoane",
        "@niko_kovac",
        "@marcus_sorg",
        "@christian_streich",
        "@bo_henriksen"
    ],
    "Serie A": [
        "@simoneinzaghi",
        "@massimilianoallegri",
        "@lucianospalletti",
        "@stefanopioli",
        "@mister_ranieri",
        "@mister_ballardini",
        "@mister_giampaolo",
        "@mister_ianni",
        "@mister_davide_nicola",
        "@mister_marco_baroni"
    ],
    "Ligue 1": [
        "@luisenrique",
        "@marcelino",
        "@paulo_fonseca",
        "@frank_haise",
        "@regis_le_bris",
        "@philippe_clement",
        "@will_still",
        "@carles_martinez",
        "@eric_roy",
        "@michel_der_zakarian"
    ],
    "MLS": [
        "@wilfried_nancy",
        "@bradley_carnell",
        "@oscar_pereja",
        "@pat_noonan",
        "@jim_curtin",
        "@steve_cherundolo",
        "@ben_olson",
        "@brian_schmetzer",
        "@pablo_maestroeni",
        "@gonzalo_pineda"
    ],
    "J1 League": [
        "@toru_oniki",
        "@kenta_hasagawa",
        "@michael_skibbe",
        "@dani_poyatos",
        "@mihailo_petrovic",
        "@masato_moriguchi",
        "@akio_kogiku",
        "@shigetoshi_hasabe",
        "@masahiro_shimoda",
        "@takayuki_yoshida"
    ],
    "Saudi Pro League": [
        "@jorge_jesus",
        "@marcelo_gallardo",
        "@luis_castro",
        "@slaven_bilic",
        "@vitor_pereira",
        "@marcelo_ze_maria",
        "@pedro_emanuel",
        "@miodrag_jevtic",
        "@alexandre_gama",
        "@daniel_ramos"
    ]
};

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
            const filtered = filterCoachesBySearch(coaches, searchTerm);
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

function filterCoachesBySearch(coachesObj, searchTerm) {
    const filtered = {};
    for (const [league, usernames] of Object.entries(coachesObj)) {
        const filteredUsernames = usernames.filter(username => 
            username.toLowerCase().includes(searchTerm)
        );
        if (filteredUsernames.length > 0) {
            filtered[league] = filteredUsernames;
        }
    }
    return filtered;
}

function renderCoaches(coachesToRender) {
    const container = document.getElementById('coachesList');
    if (container) {
        container.innerHTML = Object.entries(coachesToRender).map(([league, usernames]) => `
            <div class="league-section">
                <h3 class="league-title">${league}</h3>
                <div class="coaches-grid">
                    ${usernames.map(username => {
                        const cleanUsername = username.replace('@', '');
                        return `
                            <div class="coach-item">
                                <a href="https://www.instagram.com/${cleanUsername}/" target="_blank" class="username-link">
                                    <span class="username">${username}</span>
                                </a>
                                <div class="coach-actions">
                                    <button class="copy-btn" onclick="copySingleUsername('${username}')">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
    }
}

function copyAllUsernames() {
    const allUsernames = Object.values(coaches).flat();
    const text = allUsernames.join(' ');
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
    const filtered = filterCoachesBySearch(coaches, searchTerm);
    const allUsernames = Object.values(filtered).flat();
    const totalLength = allUsernames.join(' ').length;
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
