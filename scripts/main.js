/*
    Filepath: scripts/main.js
    Main JavaScript entry point that imports and initializes all modules
    
    This file serves as the central coordinator for all JavaScript functionality
    on the landing page. It imports functions from individual module files and
    initializes them when the DOM (Document Object Model) is fully loaded.
    
    Using this modular approach has several benefits:
    1. Better organization - Each feature has its own file
    2. Easier maintenance - You can update one feature without affecting others
    3. Improved readability - Smaller, focused files are easier to understand
    4. Code reusability - Modules can be reused across different pages
*/

// Import individual module functions
// Each import brings in specific functionality from another JavaScript file
import { initMobileNavigation, initSmoothScroll } from './navigation.js';
import { initStickyHeader } from './header.js';
import { initFaqAccordion } from './accordion.js';
import { initFormValidation } from './forms.js';
import { initTailwindConfig } from './tailwind-config.js';

/**
 * Main initialization function that runs when the DOM is fully loaded
 * 
 * The DOMContentLoaded event fires when the initial HTML document has been
 * completely loaded and parsed. This ensures all HTML elements are available
 * before we try to interact with them through JavaScript.
 * 
 * Each init function sets up a specific feature on the page:
 * - initTailwindConfig: Sets up custom Tailwind CSS theme colors
 * - initMobileNavigation: Enables the mobile menu toggle
 * - initSmoothScroll: Makes anchor links scroll smoothly to sections
 * - initStickyHeader: Creates a header that stays at the top when scrolling
 * - initFaqAccordion: Makes FAQ items expandable/collapsible
 * - initFormValidation: Validates form inputs and handles submissions
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Tailwind configuration first
    // This ensures custom theme colors are available for other components
    initTailwindConfig();
    
    // Initialize navigation functionality
    // - Mobile menu for small screens
    // - Smooth scrolling to page sections
    initMobileNavigation();
    initSmoothScroll();
    
    // Initialize header functionality
    // - Sticky behavior on scroll
    initStickyHeader();
    
    // Initialize FAQ accordion
    // - Expandable/collapsible answers
    initFaqAccordion();
    
    // Initialize form validation
    // - Input validation
    // - Form submission handling
    initFormValidation();
    
    // Log confirmation that all modules have been initialized
    // This is helpful for debugging in the browser console
    console.log('All modules initialized successfully');
});