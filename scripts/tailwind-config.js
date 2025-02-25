/*
    Filepath: scripts/tailwind-config.js
    Configures Tailwind CSS with custom theme settings
*/

export function initTailwindConfig() {
    // Check if Tailwind is available
    if (typeof window.tailwind !== 'undefined') {
        // Configure Tailwind with custom theme
        window.tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3B82F6',    // Blue
                        secondary: '#10B981',  // Green
                        accent: '#F59E0B',     // Amber
                        dark: '#1F2937',       // Dark Gray
                        light: '#F3F4F6',      // Light Gray
                    }
                }
            }
        };
        
        console.log('Tailwind CSS configured successfully');
    } else {
        console.warn('Tailwind CSS not found. Custom configuration not applied.');
    }
}