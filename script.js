// Check if DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

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
    let inactivityTimeout;

    if (!chatToggle || !chatWindow || !chatMessages || !chatInput || !chatSend) {
        console.error('One or more chatbot elements not found:', {
            chatToggle, chatWindow, chatMessages, chatInput, chatSend
        });
        alert('Error: Chatbot elements not found. Please check the HTML.');
        return;
    }

    // Initialize chatbot state
    function initializeChatbot() {
        console.log('Chatbot initialized');
        if (!chatMessages.innerHTML) {
            chatMessages.innerHTML = '<p>Hi! How can I assist you?</p>';
        }
        resetInactivityTimeout();
    }

    chatToggle.addEventListener('click', () => {
        console.log('Chat toggle clicked');
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            initializeChatbot();
        } else {
            clearTimeout(inactivityTimeout);
            console.log('Cleared inactivity timeout on manual close');
        }
    });

    chatSend.addEventListener('click', () => {
        console.log('Send button clicked');
        sendMessage();
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            console.log('Enter key pressed');
            e.preventDefault(); // Prevent new line
            sendMessage();
        }
    });

    chatInput.addEventListener('input', () => {
        console.log('Input event triggered');
        resetInactivityTimeout();
    });

    function sendMessage() {
        const userMessage = chatInput.value.trim().toLowerCase();
        if (userMessage) {
            console.log('Sending message:', userMessage);
            chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            respondToMessage(userMessage);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function respondToMessage(message) {
        let response = '';
        if (message.includes('skills')) {
            response = 'I’m skilled in JavaScript, HTML, CSS, Python, React, Node.js, AWS, Azure, Google Cloud, Git, Slack, MongoDB, and cybersecurity (Network security, NIST framework).';
        } else if (message.includes('projects') || message.includes('portfolio')) {
            response = 'Check out my projects above! My portfolio site is on GitHub: https://github.com/ylkM/portfolio.';
        } else if (message.includes('contact') || message.includes('reach')) {
            response = 'You can reach me via email: ylkmngst7@gmail.com, GitHub: https://github.com/ylkM, or LinkedIn: https://www.linkedin.com/Yilake Mengstie.';
        } else if (message.includes('experience') || message.includes('work')) {
            response = 'I have over 8 years of experience in sales, customer service, and delivery operations. Check my CV for details: <a href="Yilake Mengstie Resume.pdf" target="_blank">View CV</a>.';
        } else {
            response = 'Sorry, I didn’t catch that. Try asking about my skills, projects, experience, or how to contact me!';
        }
        setTimeout(() => {
            console.log('Bot responding with:', response);
            chatMessages.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
            resetInactivityTimeout();
            // Close chatbot 5 seconds after bot responds
            setTimeout(() => {
                if (!chatWindow.classList.contains('hidden')) {
                    chatWindow.classList.add('hidden');
                    console.log('Chatbot closed after response');
                }
            }, 5000); // 5 seconds after bot response
        }, 500);
    }

    function resetInactivityTimeout() {
        console.log('Resetting inactivity timeout');
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            console.log('Inactivity timeout triggered');
            if (!chatWindow.classList.contains('hidden')) {
                chatWindow.classList.add('hidden');
                console.log('Chatbot closed due to inactivity');
            }
        }, 5000); // 5 seconds for testing (change to 30000 for 30 seconds)
    }

    // Resume preview
    const resumeBtn = document.getElementById('resume-btn');
    const resumePreview = document.getElementById('resume-preview');

    if (resumeBtn && resumePreview) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resumePreview.classList.toggle('hidden');
        });
    } else {
        console.error('Resume elements not found:', { resumeBtn, resumePreview });
    }
});