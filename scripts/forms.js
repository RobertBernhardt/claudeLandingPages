/*
    Filepath: scripts/forms.js
    Handles form validation and submission
*/

// Initialize form validation functionality
export function initFormValidation() {
    const forms = document.querySelectorAll('#contact-form, #newsletter-form');
    
    if (forms.length === 0) {
        console.warn('Form elements not found');
        return;
    }
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all required inputs
            const requiredInputs = form.querySelectorAll('[required]');
            let isValid = true;
            
            // Check each required input
            requiredInputs.forEach(input => {
                // Clear previous error
                removeError(input);
                
                // Validate based on type
                if (input.type === 'email') {
                    if (!validateEmail(input.value)) {
                        showError(input, 'Please enter a valid email address');
                        isValid = false;
                    }
                } else if (input.value.trim() === '') {
                    showError(input, 'This field is required');
                    isValid = false;
                }
            });
            
            // If form is valid, submit or show success message
            if (isValid) {
                // Get form data
                const formData = new FormData(form);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Show loading state
                const submitButton = form.querySelector('[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // For demo purposes, we'll simulate a submission
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'bg-secondary bg-opacity-10 text-secondary px-4 py-3 rounded-lg mt-4';
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    
                    // Add success message to form
                    form.appendChild(successMessage);
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                    
                    // Log form data (in a real app, this would be sent to a server)
                    console.log('Form submitted:', formObject);
                }, 1500);
            }
        });
    });
    
    console.log('Form validation initialized');
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Helper function to show error
function showError(input, message) {
    // Create error element
    const errorElement = document.createElement('p');
    errorElement.className = 'text-red-500 text-sm mt-1 error-message';
    errorElement.textContent = message;
    
    // Add error class to input
    input.classList.add('border-red-500');
    
    // Insert error after input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

// Helper function to remove error
function removeError(input) {
    // Remove error class from input
    input.classList.remove('border-red-500');
    
    // Remove any existing error messages
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}