// Main JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.stills-gallery .image-item img');
    let currentImageIndex = 0;
    
    // Open lightbox
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Navigate lightbox
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        });
    }
    
    function updateLightboxImage() {
        if (galleryImages[currentImageIndex] && lightboxImg) {
            lightboxImg.src = galleryImages[currentImageIndex].src;
            lightboxImg.alt = galleryImages[currentImageIndex].alt;
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && lightboxPrev) {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight' && lightboxNext) {
                lightboxNext.click();
            }
        }
    });
    
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's a same-page link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ENHANCED FLUID HEADER SCROLL ANIMATION
    const header = document.querySelector('header');
    const headerInfo = document.querySelector('.header-info');
    
    // Scroll state variables
    let ticking = false;
    let lastScrollY = 0;
    
    // Smooth scroll handler with requestAnimationFrame
    function updateHeader() {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        
        // Header shadow and background enhancement
        if (header) {
            if (scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Progressive profile section hiding with three states
        if (headerInfo) {
            if (scrollY > 120) {
                // Fully hidden
                headerInfo.classList.remove('hiding');
                headerInfo.classList.add('hide');
            } else if (scrollY > 40) {
                // Progressive hiding state
                headerInfo.classList.remove('hide');
                headerInfo.classList.add('hiding');
            } else {
                // Fully visible
                headerInfo.classList.remove('hide', 'hiding');
            }
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    // Optimized scroll listener using requestAnimationFrame
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial state check
    window.addEventListener('load', updateHeader);
    
    // Image lazy loading enhancement
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe all images
        const allImages = document.querySelectorAll('.image-item, .project-card');
        allImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const message = formData.get('message') || this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // For now, just show a success message
            // In production, you'd send this to your server
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
    
});

// Updated project opening function - Replace in your main.js

// Project opening function (for portfolio page)
function openProject(projectName) {
    // Convert project names to URL-friendly slugs
    const projectUrls = {
        'Urban Geometry': 'urban-geometry.html',
        'Solitude in Motion': 'solitude-in-motion.html',
        'Light & Shadow': 'light-and-shadow.html',
        'Analog Dreams': 'analog-dreams.html',
        'Minimal Forms': 'minimal-forms.html',
        'Street Stories': 'street-stories.html',
        'Street Stories': 'street-stories.html', // Handle duplicate
        'Formula Student': 'solitude-in-motion.html', // Map to existing
        'Portraits': 'light-and-shadow.html', // Map to existing
        'Automotive': 'minimal-forms.html' // Map to existing
    };
    
    const projectUrl = projectUrls[projectName];
    
    if (projectUrl) {
        // Navigate to the project page
        window.location.href = projectUrl;
    } else {
        // Fallback for unmapped projects
        console.log('Opening project:', projectName);
        alert('Project page for "' + projectName + '" is being created. Please check back soon!');
    }
}

// Utility function to handle image loading errors
function handleImageError(img) {
    img.style.background = '#f0f0f0';
    img.alt = 'Image not found';
}

// Add error handling to all images
document.addEventListener('DOMContentLoaded', function() {
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
});
