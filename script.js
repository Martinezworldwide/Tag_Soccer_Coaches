function copyToClipboard() {
    const textArea = document.getElementById('usernames');
    textArea.select();
    document.execCommand('copy');
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.textContent = 'Usernames copied to clipboard!';
    setTimeout(() => copyMessage.textContent = '', 2000);
}

function openInstagram() {
    window.location.href = 'https://www.instagram.com/';
}
