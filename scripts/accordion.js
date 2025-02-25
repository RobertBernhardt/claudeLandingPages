/*
    Filepath: scripts/accordion.js
    Handles FAQ accordion functionality
    
    This file creates an interactive accordion for the FAQ section.
    An accordion is a UI component that displays a list of headers that can be clicked
    to reveal or hide their associated content panels. This creates a cleaner interface
    by showing only the content the user wants to see.
*/

/**
 * Initializes the FAQ accordion functionality
 * 
 * This function:
 * 1. Finds all FAQ question elements on the page
 * 2. Adds click event listeners to each question
 * 3. Sets up the initial state (all answers closed)
 * 4. Configures accessibility attributes
 * 
 * When a question is clicked, it will:
 * - Toggle the visibility of its answer
 * - Close any other open answers (accordion behavior)
 * - Update accessibility attributes appropriately
 */
export function initFaqAccordion() {
    // Find all elements with the 'faq-question' class
    // These are the clickable headers of the accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Check if FAQ elements exist on the page
    if (faqQuestions.length === 0) {
        // Log a warning if no FAQ elements are found
        // This helps with debugging if the accordion doesn't appear
        console.warn('FAQ elements not found');
        return;
    }
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Get the parent FAQ item (the container for both question and answer)
            const faqItem = this.parentElement;
            
            // Get the answer element that belongs to this question
            const answer = faqItem.querySelector('.faq-answer');
            
            // Toggle the 'active' class on the FAQ item
            // This class can be used for styling the active state in CSS
            // The toggle() method returns true if the class was added, false if removed
            const isActive = faqItem.classList.toggle('active');
            
            // Toggle the aria-expanded attribute for accessibility
            // This tells screen readers whether the content is expanded or collapsed
            this.setAttribute('aria-expanded', isActive);
            
            // Toggle the visibility of the answer
            if (isActive) {
                // If active, set the max height to the actual height of the content
                // This creates a smooth animation effect when opening
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.setAttribute('aria-hidden', 'false');
            } else {
                // If not active, collapse the answer by setting max height to 0
                answer.style.maxHeight = '0';
                answer.setAttribute('aria-hidden', 'true');
            }
            
            // Close other FAQ items (optional, for accordion behavior)
            // This makes only one answer visible at a time
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    // Skip the current question, only process others
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    // If the other item is active, close it
                    if (otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                }
            });
        });
    });
    
    // Initialize: Close all answers by default
    faqQuestions.forEach(question => {
        const answer = question.parentElement.querySelector('.faq-answer');
        
        // Set initial ARIA attributes for accessibility
        // These attributes help screen readers understand the state of the accordion
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        
        // Set initial styles to ensure answers are hidden when the page loads
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        // This transition creates the smooth animation effect
        // You can modify the duration (0.3s) to make it faster or slower
        answer.style.transition = 'max-height 0.3s ease-out';
    });
    
    // Log confirmation that the accordion has been set up
    console.log('FAQ accordion initialized');
}