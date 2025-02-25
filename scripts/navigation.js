/*
    Filepath: scripts/navigation.js
    Handles mobile navigation toggle and smooth scrolling functionality
    
    This file manages two key navigation features:
    1. The mobile menu that appears on smaller screens
    2. Smooth scrolling when clicking on navigation links
    
    These features improve user experience by providing easy navigation
    across different screen sizes and creating smoother transitions
    when moving between page sections.
*/

/**
 * Initializes mobile navigation menu toggle functionality
 * 
 * This function:
 * 1. Finds the mobile menu button and menu container elements
 * 2. Sets up click events to show/hide the mobile menu
 * 3. Closes the menu when a link is clicked or when clicking outside the menu
 * 
 * The mobile menu is hidden by default and appears when the menu button is clicked.
 * It's designed for smaller screens where the full navigation bar doesn't fit.
 */
export function initMobileNavigation() {
    // Find the mobile menu button and menu container elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Check if the necessary elements exist on the page
    if (!mobileMenuButton || !mobileMenu) {
        console.warn('Mobile navigation elements not found');
        return;
    }
    
    // Toggle mobile menu visibility when the button is clicked
    // The 'hidden' class controls whether the menu is displayed or not
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on any menu item
    // This improves user experience by closing the menu after making a selection
    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Close mobile menu when clicking outside of it
    // This is a common pattern that users expect in dropdown menus
    document.addEventListener('click', function(event) {
        // Check if the click was outside both the menu button and menu itself
        if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    console.log('Mobile navigation initialized');
}

/**
 * Initializes smooth scrolling for anchor links
 * 
 * This function:
 * 1. Finds all links that point to page sections (href starting with #)
 * 2. Adds click event listeners to these links
 * 3. Smoothly scrolls to the target section when a link is clicked
 * 4. Adjusts the scroll position to account for the fixed header
 * 
 * Smooth scrolling creates a more pleasant user experience than the default
 * jumpy behavior when navigating between sections.
 */
export function initSmoothScroll() {
    // Find the header element (needed to calculate offset)
    const header = document.querySelector('header');
    
    // Find all links that point to sections on the same page
    // These are identified by href attributes starting with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Check if the necessary elements exist
    if (navLinks.length === 0 || !header) {
        console.warn('Navigation links or header not found');
        return;
    }
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default anchor behavior (instant jump)
            e.preventDefault();
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href');
            
            // Skip if the href is just "#" (often used for buttons that don't link to sections)
            if (targetId === '#') return;
            
            // Find the target section element
            const targetSection = document.querySelector(targetId);
            
            // Skip if the target section doesn't exist
            if (!targetSection) return;
            
            // Get the header height to offset the scroll position
            // This prevents the header from covering the top of the section
            const headerHeight = header.offsetHeight;
            
            // Calculate the position to scroll to
            // Subtracting the header height ensures the section isn't hidden behind the header
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Scroll smoothly to the target section
            // The 'behavior: smooth' property creates the smooth animation effect
            // You can adjust this if you want faster or slower scrolling
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    console.log('Smooth scroll navigation initialized');
}