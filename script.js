// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Chatbot functionality
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    if (!chatMessages.innerHTML) {
        chatMessages.innerHTML = '<p>Hi! How can I assist you?</p>';
    }
});

chatSend.addEventListener('click', () => {
    const userMessage = chatInput.value.trim().toLowerCase();
    if (userMessage) {
        chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        respondToMessage(userMessage);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

function respondToMessage(message) {
    let response = '';
    if (message.includes('skills')) {
        response = 'I’m skilled in web development, and cloud computing, cybersecurity, sales, and customer service.';
    } else if (message.includes('projects')) {
        response = 'Check out my projects above! My portfolio site is on GitHub: https://github.com/ylkM.';
    } else if (message.includes('contact')) {
        response = 'You can reach me via the Contact section above!';
    } else {
        response = 'Sorry, I didn’t catch that. Try asking about my skills, projects, or how to contact me!';
    }
    setTimeout(() => {
        chatMessages.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

// Form submission (simulated)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! (This is a demo)');
    e.target.reset();
});