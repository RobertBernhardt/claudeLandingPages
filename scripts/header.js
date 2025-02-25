/*
    Filepath: scripts/header.js
    Handles sticky header behavior on scroll
    
    This file manages the behavior of the page header as the user scrolls,
    making it "sticky" (fixed at the top of the viewport) and adding visual
    effects like shadows to improve navigation experience.
    
    A sticky header ensures that navigation is always accessible to users
    regardless of how far they've scrolled down the page.
*/

/**
 * Initializes the sticky header functionality
 * 
 * This function:
 * 1. Finds the header element
 * 2. Sets up a scroll event listener
 * 3. Updates the header's appearance based on scroll position
 * 4. Runs on page load to set the initial state
 * 
 * When the user scrolls past a certain threshold, the header gains a shadow
 * effect to visually separate it from the content and emphasize its "floating"
 * nature.
 */
export function initStickyHeader() {
    // Find the header element in the DOM
    const header = document.querySelector('header');
    
    // Check if header element exists
    if (!header) {
        // Log a warning and exit if no header is found
        console.warn('Header element not found');
        return;
    }
    
    // Define the scroll threshold that triggers the header style change
    // You can adjust this number to change when the header styling activates
    const scrollThreshold = 50; // in pixels
    
    /**
     * Function to update header styling based on current scroll position
     * 
     * This is called both on page load and whenever the user scrolls.
     * It adds or removes CSS classes that control the header's appearance.
     */
    function updateHeaderOnScroll() {
        if (window.scrollY > scrollThreshold) {
            // When scrolled past threshold:
            // - Add shadow for visual separation from content
            // - Ensure the background is solid white (for content underneath)
            header.classList.add('shadow-md');
            header.classList.add('bg-white');
        } else {
            if (window.scrollY === 0) {
                // When at the very top of the page:
                // - Remove the shadow for a cleaner look
                header.classList.remove('shadow-md');
                // The bg-white class is kept for consistent styling
                // If you want a transparent header at the top, you could remove that class here
            }
        }
    }
    
    // Run on page load to set the initial state
    // This ensures the header looks correct even if the page is loaded
    // while already scrolled down
    updateHeaderOnScroll();
    
    // Add scroll event listener to update header on scroll
    // The function runs every time the user scrolls the page
    window.addEventListener('scroll', function() {
        updateHeaderOnScroll();
    });
    
    // Log confirmation that sticky header functionality is ready
    console.log('Sticky header initialized');
}