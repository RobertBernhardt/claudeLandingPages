/*
    Filepath: scripts/tailwind-config.js
    Configures Tailwind CSS with custom theme settings
    
    This file customizes the Tailwind CSS framework by defining a custom color theme.
    
    What is Tailwind CSS?
    Tailwind is a utility-first CSS framework that provides low-level utility classes
    to build designs directly in your markup. Instead of writing custom CSS, you
    apply pre-defined classes to your HTML elements (like bg-primary, text-dark, etc.).
    
    This configuration extends Tailwind with custom colors used throughout the site:
    - primary: Blue - Used for main buttons, links, and highlights
    - secondary: Green - Used for success states and secondary actions
    - accent: Amber - Used for attention-grabbing elements
    - dark: Dark Gray - Used for text and dark backgrounds
    - light: Light Gray - Used for backgrounds and subtle elements
*/

/**
 * Initializes Tailwind CSS with custom theme configuration
 * 
 * This function:
 * 1. Checks if Tailwind CSS is available on the page
 * 2. Extends Tailwind's default configuration with custom colors
 * 3. Logs confirmation or warning messages to the console
 * 
 * The custom color palette is used throughout the site via utility classes
 * like 'bg-primary', 'text-dark', etc. Changing these color values here
 * will update the appearance across the entire site.
 */
export function initTailwindConfig() {
    // Check if Tailwind is available on the page
    // The Tailwind CDN makes 'window.tailwind' available for configuration
    if (typeof window.tailwind !== 'undefined') {
        // Configure Tailwind with a custom color theme
        // The 'extend' property adds to Tailwind's defaults rather than replacing them
        window.tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        // Custom color palette
                        // You can modify these hex values to change the site's color scheme
                        primary: '#3B82F6',    // Blue - Main brand color
                        secondary: '#10B981',  // Green - Used for success states
                        accent: '#F59E0B',     // Amber - For attention-grabbing elements
                        dark: '#1F2937',       // Dark Gray - For text and dark backgrounds
                        light: '#F3F4F6',      // Light Gray - For backgrounds and subtle elements
                    }
                }
            }
        };
        
        console.log('Tailwind CSS configured successfully');
    } else {
        // If Tailwind isn't available, log a warning
        // This might happen if the Tailwind CDN script fails to load
        console.warn('Tailwind CSS not found. Custom configuration not applied.');
    }
}