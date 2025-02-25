/*
    Filepath: scripts/header.js
    Handles sticky header behavior on scroll
*/

// Initialize sticky header functionality
export function initStickyHeader() {
    const header = document.querySelector('header');
    
    if (!header) {
        console.warn('Header element not found');
        return;
    }
    
    const scrollThreshold = 50;
    
    // Function to update header styling based on scroll position
    function updateHeaderOnScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('shadow-md');
            header.classList.add('bg-white');
        } else {
            if (window.scrollY === 0) {
                header.classList.remove('shadow-md');
                // Keep bg-white class for consistent styling
            }
        }
    }
    
    // Run on page load
    updateHeaderOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', function() {
        updateHeaderOnScroll();
    });
    
    console.log('Sticky header initialized');
}