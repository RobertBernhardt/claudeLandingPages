/*
    Filepath: scripts/accordion.js
    Handles FAQ accordion functionality
*/

// Initialize FAQ accordion functionality
export function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.warn('FAQ elements not found');
        return;
    }
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Get the parent FAQ item
            const faqItem = this.parentElement;
            
            // Get the answer element
            const answer = faqItem.querySelector('.faq-answer');
            
            // Toggle the 'active' class on the FAQ item
            const isActive = faqItem.classList.toggle('active');
            
            // Toggle the aria-expanded attribute for accessibility
            this.setAttribute('aria-expanded', isActive);
            
            // Toggle the visibility of the answer
            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.setAttribute('aria-hidden', 'false');
            } else {
                answer.style.maxHeight = '0';
                answer.setAttribute('aria-hidden', 'true');
            }
            
            // Close other FAQ items (optional, for accordion behavior)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
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
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        
        // Set initial styles
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out';
    });
    
    console.log('FAQ accordion initialized');
}