/*
    Filepath: scripts/navigation.js
    Handles mobile navigation toggle and smooth scrolling functionality
*/

// Initialize mobile navigation menu toggle
export function initMobileNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) {
        console.warn('Mobile navigation elements not found');
        return;
    }
    
    // Toggle mobile menu visibility when button is clicked
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a menu item
    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    console.log('Mobile navigation initialized');
}

// Initialize smooth scrolling for anchor links
export function initSmoothScroll() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    if (navLinks.length === 0 || !header) {
        console.warn('Navigation links or header not found');
        return;
    }
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (often used for buttons that don't link to sections)
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            // Skip if target doesn't exist
            if (!targetSection) return;
            
            // Get header height to offset scroll position
            const headerHeight = header.offsetHeight;
            
            // Calculate position to scroll to
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Scroll smoothly to the target section
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    console.log('Smooth scroll navigation initialized');
}