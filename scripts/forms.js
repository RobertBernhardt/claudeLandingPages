/*
    Filepath: scripts/forms.js
    Handles form validation and submission
    
    This file manages all form-related functionality on the landing page, including:
    - Client-side validation (checking required fields and email format)
    - Showing error messages when validation fails
    - Simulating form submission (in a real app, you would send data to a server)
    - Displaying success messages after submission
*/

/**
 * Initializes form validation functionality for contact and newsletter forms
 * 
 * This function:
 * 1. Finds all forms with the specified IDs
 * 2. Adds submit event listeners to each form
 * 3. Validates all required fields when a form is submitted
 * 4. Handles the submission process if validation passes
 * 
 * The validation checks:
 * - That required fields are not empty
 * - That email fields contain valid email addresses
 */
export function initFormValidation() {
    // Select the contact and newsletter forms by their IDs
    const forms = document.querySelectorAll('#contact-form, #newsletter-form');
    
    // Check if any forms exist on the page
    if (forms.length === 0) {
        // Log a warning if no forms are found
        console.warn('Form elements not found');
        return;
    }
    
    // Add submit event listener to each form
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Prevent the default form submission behavior
            // This allows us to validate before submitting
            e.preventDefault();
            
            // Get all inputs that have the 'required' attribute
            const requiredInputs = form.querySelectorAll('[required]');
            let isValid = true;
            
            // Check each required input for validity
            requiredInputs.forEach(input => {
                // Clear any previous error messages first
                removeError(input);
                
                // Validate based on input type
                if (input.type === 'email') {
                    // For email inputs, check the format using a helper function
                    if (!validateEmail(input.value)) {
                        showError(input, 'Please enter a valid email address');
                        isValid = false;
                    }
                } else if (input.value.trim() === '') {
                    // For other inputs, just check that they're not empty
                    showError(input, 'This field is required');
                    isValid = false;
                }
            });
            
            // If all validations pass, process the form submission
            if (isValid) {
                // Get all form data as a FormData object
                const formData = new FormData(form);
                const formObject = {};
                
                // Convert FormData to a regular JavaScript object
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Show loading state on the submit button
                const submitButton = form.querySelector('[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // For demonstration purposes, we simulate a submission with a timeout
                // In a real application, this would be an AJAX request to your server
                setTimeout(() => {
                    // Reset the form after successful submission
                    form.reset();
                    
                    // Create and show a success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'bg-secondary bg-opacity-10 text-secondary px-4 py-3 rounded-lg mt-4';
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    
                    // Add the success message to the form
                    form.appendChild(successMessage);
                    
                    // Reset the submit button to its original state
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Remove the success message after 5 seconds
                    // You can adjust this timeout to make the message stay longer or shorter
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                    
                    // Log the form data (for demonstration purposes)
                    // In a real application, this data would be sent to a server
                    console.log('Form submitted:', formObject);
                }, 1500); // Simulate 1.5 second server response time
            }
        });
    });
    
    console.log('Form validation initialized');
}

/**
 * Helper function to validate email addresses
 * 
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email is valid, false otherwise
 * 
 * This function uses a regular expression to check if an email follows
 * a standard format. It's not 100% comprehensive, but catches most errors.
 */
function validateEmail(email) {
    // This regular expression checks for a standard email format
    // You can modify this regex if you need more specific validation rules
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Helper function to show an error message for an input
 * 
 * @param {HTMLElement} input - The input element with the error
 * @param {string} message - The error message to display
 * 
 * This function:
 * 1. Creates a new error message element
 * 2. Adds a red border to the input
 * 3. Inserts the error message after the input
 */
function showError(input, message) {
    // Create error element with appropriate styling
    const errorElement = document.createElement('p');
    errorElement.className = 'text-red-500 text-sm mt-1 error-message';
    errorElement.textContent = message;
    
    // Add error class to the input to show a red border
    input.classList.add('border-red-500');
    
    // Insert the error message after the input in the DOM
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Helper function to remove error styling and messages
 * 
 * @param {HTMLElement} input - The input element to clear errors from
 * 
 * This function:
 * 1. Removes the red border from the input
 * 2. Removes any existing error message elements
 */
function removeError(input) {
    // Remove error styling from the input
    input.classList.remove('border-red-500');
    
    // Find and remove any existing error message
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}