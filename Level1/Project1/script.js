document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the form from submitting normally

    // Get the name from the input field
    const nameInput = document.querySelector('#contactForm input[type="text"]');
    const name = nameInput ? nameInput.value : 'A valued intern';
    
    const messageDiv = document.getElementById('formMessage');

    // Display a confirmation message
    messageDiv.innerHTML = `Thank you, ${name}! Your message has been received. (In a real application, this data would be sent to a server.)`;
    messageDiv.style.color = 'green';
    messageDiv.style.marginTop = '15px';
    messageDiv.style.fontWeight = 'bold';

    // Reset the form
    this.reset();
});