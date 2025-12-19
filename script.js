// DOM Elements
const giftBox = document.getElementById('giftBox');
const cardSection = document.getElementById('cardSection');
const birthdayCard = document.getElementById('birthdayCard');
const imageSection = document.getElementById('imageSection');
const imageGrid = document.getElementById('imageGrid');
const confettiContainer = document.getElementById('confettiContainer');
const confettiRain = document.getElementById('confettiRain');
const currentYearSpan = document.getElementById('currentYear');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Variables for state management
let hasOpenedGift = false;
let continuousConfettiInterval = null;

// Gift click handler
giftBox.addEventListener('click', openGift);

// Function to open the gift and reveal content
function openGift() {
    if (hasOpenedGift) return;
    
    hasOpenedGift = true;
    
    // Disable further clicks
    giftBox.style.pointerEvents = 'none';
    
    // Animate gift opening
    giftBox.style.animation = 'openGift 0.8s ease-in-out forwards';
    
    // Create initial confetti burst
    createConfettiBurst();
    
    // Start continuous confetti rain
    startConfettiRain();
    
    // After animation completes, reveal card
    setTimeout(() => {
        // Hide gift container
        giftBox.parentElement.style.display = 'none';
        
        // Show card section with animation
        cardSection.classList.remove('hidden');
        cardSection.style.animation = 'fadeInUp 1s ease-out';
        
        // After card is shown, wait for user to read it
        setTimeout(() => {
            // Start fading card background after 8 seconds
            setTimeout(fadeCardBackground, 8000);
            
            // Show image section after card background fades
            setTimeout(showImages, 10000);
        }, 1000);
    }, 800);
}

// Function to create initial confetti burst
function createConfettiBurst() {
    const confettiCount = 80;
    const colors = ['#d4af37', '#f4e8c1', '#ffffff', '#ffd700'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const size = Math.random() * 12 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 2 + 1;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}vw`;
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Add to container
        confettiContainer.appendChild(confetti);
        
        // Animate confetti explosion
        const animation = confetti.animate([
            { 
                transform: `translateY(0) rotate(0deg) scale(1)`, 
                opacity: 1 
            },
            { 
                transform: `translateY(${Math.random() * 300 - 150}px) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg) scale(0)`, 
                opacity: 0 
            }
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
    }, 3000);
}

// Function to start continuous confetti rain
function startConfettiRain() {
    // Activate the confetti rain container
    confettiRain.classList.add('active');
    
    // Create continuous confetti particles
    continuousConfettiInterval = setInterval(() => {
        createConfettiParticle();
    }, 200); // Create a new particle every 200ms
}

// Function to create a single confetti particle for rain
function createConfettiParticle() {
    const particle = document.createElement('div');
    particle.classList.add('confetti-particle');
    
    // Random properties
    const left = Math.random() * 100;
    const size = Math.random() * 6 + 4;
    const duration = Math.random() * 5 + 8; // 8-13 seconds for slow fall
    const delay = Math.random() * 2;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}vw`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Add to container
    confettiRain.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode === confettiRain) {
            particle.remove();
        }
    }, (duration + delay) * 1000);
}

// Function to fade card background to transparent
function fadeCardBackground() {
    birthdayCard.classList.add('fade-background');
    
    // Also fade out the continuous confetti rain
    setTimeout(() => {
        confettiRain.classList.remove('active');
        clearInterval(continuousConfettiInterval);
        confettiRain.innerHTML = '';
    }, 2000);
}

// Function to show images in random positions
function showImages() {
    // Show image section
    imageSection.classList.remove('hidden');
    imageSection.style.animation = 'fadeInUp 1s ease-out';
    
    // Get all sticker images
    const stickers = document.querySelectorAll('.sticker');
    
    // Calculate available space
    const gridWidth = imageGrid.offsetWidth;
    const gridHeight = imageGrid.offsetHeight;
    
    // Track used positions to avoid overlap
    const usedPositions = [];
    const minDistance = 150; // Minimum distance between stickers
    
    stickers.forEach((sticker, index) => {
        // Set random position
        let x, y;
        let attempts = 0;
        const maxAttempts = 50;
        
        do {
            x = Math.random() * (gridWidth - 200); // Account for max sticker width
            y = Math.random() * (gridHeight - 200); // Account for max sticker height
            attempts++;
            
            // Check if position is too close to existing stickers
            let tooClose = false;
            for (const pos of usedPositions) {
                const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                if (distance < minDistance) {
                    tooClose = true;
                    break;
                }
            }
            
            if (!tooClose || attempts >= maxAttempts) {
                usedPositions.push({ x, y });
                break;
            }
        } while (attempts < maxAttempts);
        
        // Apply position with slight random rotation
        const rotation = Math.random() * 20 - 10; // -10 to 10 degrees
        sticker.style.left = `${x}px`;
        sticker.style.top = `${y}px`;
        sticker.style.transform = `rotate(${rotation}deg)`;
        
        // Make sticker visible with delay
        setTimeout(() => {
            sticker.classList.add('visible');
        }, index * 300);
    });
}

// Add hover effect for desktop
giftBox.addEventListener('mouseenter', () => {
    if (!hasOpenedGift) {
        giftBox.style.transform = 'scale(1.05)';
    }
});

giftBox.addEventListener('mouseleave', () => {
    if (!hasOpenedGift && giftBox.style.animation !== 'openGift 0.8s ease-in-out forwards') {
        giftBox.style.transform = 'scale(1)';
    }
});

// Add a subtle interactive effect to the card
document.addEventListener('DOMContentLoaded', function() {
    if (birthdayCard) {
        birthdayCard.addEventListener('mouseenter', function() {
            if (!this.classList.contains('fade-background')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }
        });
        
        birthdayCard.addEventListener('mouseleave', function() {
            if (!this.classList.contains('fade-background')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }
        });
    }
});

// Handle window resize - reposition images
window.addEventListener('resize', function() {
    if (imageSection && !imageSection.classList.contains('hidden')) {
        // Trigger repositioning of images
        const stickers = document.querySelectorAll('.sticker.visible');
        if (stickers.length > 0) {
            // Simple reposition - just remove and re-add visible class
            stickers.forEach(sticker => {
                sticker.classList.remove('visible');
                setTimeout(() => {
                    sticker.classList.add('visible');
                }, 100);
            });
        }
    }
});

// Preload images to avoid layout shift
window.addEventListener('load', function() {
    const images = document.querySelectorAll('.sticker');
    images.forEach(img => {
        // Check if image loaded successfully
        if (img.complete && img.naturalHeight === 0) {
            console.log(`Image ${img.src} failed to load`);
        }
    });
});
