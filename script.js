// DOM Elements
const giftBox = document.getElementById('giftBox');
const cardSection = document.getElementById('cardSection');
const gallerySection = document.getElementById('gallerySection');
const confettiContainer = document.getElementById('confettiContainer');
const currentYearSpan = document.getElementById('currentYear');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Gift click handler
giftBox.addEventListener('click', openGift);

// Function to open the gift and reveal content
function openGift() {
    // Disable further clicks
    giftBox.style.pointerEvents = 'none';
    
    // Animate gift opening
    giftBox.style.animation = 'openGift 0.8s ease-in-out forwards';
    
    // Create confetti effect
    createConfetti();
    
    // After animation completes, reveal card and gallery
    setTimeout(() => {
        // Hide gift container
        giftBox.parentElement.style.display = 'none';
        
        // Show card section with animation
        cardSection.classList.remove('hidden');
        cardSection.style.animation = 'fadeInUp 1s ease-out';
        
        // Show gallery section after a delay
        setTimeout(() => {
            gallerySection.classList.remove('hidden');
            gallerySection.style.animation = 'fadeInUp 1s ease-out';
            
            // Trigger photo fade-in animations
            const photoContainers = document.querySelectorAll('.photo-container');
            photoContainers.forEach(container => {
                container.classList.add('fade-in');
            });
        }, 800);
    }, 800);
}

// Function to create confetti effect
function createConfetti() {
    const confettiCount = 100;
    const colors = ['#d4af37', '#f4e8c1', '#ffffff', '#ffd700'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}vw`;
        confetti.style.top = '-20px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Add to container
        confettiContainer.appendChild(confetti);
        
        // Animate confetti falling
        const animation = confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: animationDuration * 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Remove confetti after animation completes
        animation.onfinish = () => {
            confetti.remove();
        };
    }
    
    // Clear confetti container after all animations complete
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// Add hover effect for desktop
giftBox.addEventListener('mouseenter', () => {
    giftBox.style.transform = 'scale(1.05)';
});

giftBox.addEventListener('mouseleave', () => {
    if (giftBox.style.animation !== 'openGift 0.8s ease-in-out forwards') {
        giftBox.style.transform = 'scale(1)';
    }
});

// Preload images to avoid layout shift
window.addEventListener('load', function() {
    const images = document.querySelectorAll('.photo');
    images.forEach(img => {
        // Check if image loaded successfully, otherwise use fallback
        if (img.complete && img.naturalHeight === 0) {
            // Image failed to load, we already have fallback in onerror attribute
            console.log(`Image ${img.src} failed to load, using fallback`);
        }
    });
});

// Add a subtle interactive effect to the card
document.addEventListener('DOMContentLoaded', function() {
    const birthdayCard = document.querySelector('.birthday-card');
    
    if (birthdayCard) {
        birthdayCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        birthdayCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
    }
});
