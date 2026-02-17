document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the email input value
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;

    const messageDiv = document.getElementById('formMessage');

    // Display a success message
    messageDiv.innerHTML = `Success! A confirmation has been sent to **${email}**. You are now ready to CodeFlow.`;
    messageDiv.style.color = 'white';
    messageDiv.style.marginTop = '20px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.fontSize = '1.1em';

    // Clear the form fields
    this.reset();
});