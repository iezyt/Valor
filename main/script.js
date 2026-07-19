const navLinksContainer = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const indicator = document.querySelector('.nav-indicator');
const urlSpan = document.getElementById('browserUrlText');

// --- Navigation Indicator Code Logic ---
function moveIndicator(target) {
    if (!target) return;
    
    const targetRect = target.getBoundingClientRect();
    const parentRect = navLinksContainer.getBoundingClientRect();
    
    const width = targetRect.width;
    const left = targetRect.left - parentRect.left;
    const height = targetRect.height;
    const top = targetRect.top - parentRect.top;
    
    indicator.style.width = `${width}px`;
    indicator.style.left = `${left}px`;
    indicator.style.height = `${height}px`;
    indicator.style.top = `${top}px`;
    
    indicator.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        // Use requestAnimationFrame for smoother positioning
        requestAnimationFrame(() => {
            indicator.style.transition = 'none';
            moveIndicator(activeItem);
            
            requestAnimationFrame(() => {
                indicator.offsetHeight; 
                indicator.style.transition = '';
            });
        });
    }
    
    if(urlSpan) {
        setTimeout(startTypewriter, 1000);
    }
});

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // If it points to an actual page file, allow regular navigation
        if (this.getAttribute('href') !== '#') {
            return;
        }
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        moveIndicator(this);
    });
});

// --- Human-like Typewriter Simulation for Browser URL bar ---
const fullUrlText = "https://Valor.wtf";
let currentText = "https://"; 

function startTypewriter() {
    const textToType = fullUrlText.substring(currentText.length);
    let index = 0;
    
    function typeNextCharacter() {
        if (index < textToType.length) {
            currentText += textToType.charAt(index);
            urlSpan.textContent = currentText;
            index++;
            
            const humanDelay = Math.random() * (160 - 70) + 70; 
            setTimeout(typeNextCharacter, humanDelay);
        }
    }
    
    typeNextCharacter();
}

const settingsBtn = document.querySelector('.settings-btn');
if(settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        console.log('Settings opened');
    });
}

// --- Interactive FAQ Accordion Panel Component ---
const faqTriggers = document.querySelectorAll('.faq-trigger');

faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        const parentBox = this.parentElement;
        const targetPanel = this.nextElementSibling;
        
        const isOpen = parentBox.classList.contains('active-panel');
        
        document.querySelectorAll('.faq-item-box').forEach(box => {
            box.classList.remove('active-panel');
            box.querySelector('.faq-panel').style.maxHeight = null;
        });
        
        if (!isOpen) {
            parentBox.classList.add('active-panel');
            targetPanel.style.maxHeight = targetPanel.scrollHeight + "px";
        }
    });
});