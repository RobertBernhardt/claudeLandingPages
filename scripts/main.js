/*
    Filepath: scripts/main.js
    Main JavaScript entry point that imports and initializes all modules
*/

// Import individual module functions
import { initMobileNavigation, initSmoothScroll } from './navigation.js';
import { initStickyHeader } from './header.js';
import { initFaqAccordion } from './accordion.js';
import { initFormValidation } from './forms.js';
import { initTailwindConfig } from './tailwind-config.js';

// Function to initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Tailwind configuration
    initTailwindConfig();
    
    // Initialize navigation functionality
    initMobileNavigation();
    initSmoothScroll();
    
    // Initialize header functionality
    initStickyHeader();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize form validation
    initFormValidation();
    
    console.log('All modules initialized successfully');
});