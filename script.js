const welcomeHeader = document.getElementById('welcome-header');
const revealBtn = document.getElementById('reveal-btn');

function reveal() {
    const h2Element = document.createElement('h2');
    h2Element.textContent = "Michael Harrington's Portfolio";
    h2Element.classList.add('colorful');
    welcomeHeader.appendChild(h2Element);
    revealBtn.remove();
}

revealBtn.addEventListener('click', reveal);