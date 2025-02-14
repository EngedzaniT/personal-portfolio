const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

// Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChat = document.getElementById('closeChat');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Initialize chat window as hidden
    if (chatbotWindow) {
        chatbotWindow.style.display = 'none';
    }

    // Add welcome message
    setTimeout(() => {
        if (chatMessages) {
            addMessage("Hi there! 👋 I'm Engedzani's chatbot assistant. Feel free to ask me about his skills, experience, or anything else!", 'bot-message');
        }
    }, 1000);

    // Toggle chat window
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', () => {
            chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';
            if (chatbotWindow.style.display === 'flex') {
                userInput.focus();
            }
        });
    }

    // Close chat window
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });
    }

    // Send message function
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user-message');
            
            // Get bot response
            const response = getBotResponse(message);
            
            // Add bot response with a small delay
            setTimeout(() => {
                addMessage(response, 'bot-message');
            }, 500);

            userInput.value = '';
        }
    }

    // Add message to chat
    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        // Simple response logic
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I help you today?";
        } else if (message.includes('skills') || message.includes('experience') || message.includes('work')) {
            return "I have experience in Cloud Engineering, Python, Java, SQL, and more. I'm particularly skilled in network security and cloud computing. Check out my skills section for more details!";
        } else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
            return "You can reach me through LinkedIn at https://www.linkedin.com/in/tshitereke-engedzani-7a3308250/ or check out my projects on GitHub at https://github.com/EngedzaniT";
        } else if (message.includes('education') || message.includes('study') || message.includes('qualification')) {
            return "I have a diploma in Information Technology with focus on programming, network security, and cloud computing. I also hold a CCNA certification!";
        } else if (message.includes('certificate') || message.includes('certification') || message.includes('ccna')) {
            return "I have earned my CCNA (Cisco Certified Network Associate) certification, which validates my networking skills. You can view my certificate in the Awards section!";
        } else if (message.includes('project') || message.includes('portfolio')) {
            return "I've worked on various projects in cloud computing, software development, and networking. Feel free to check out my GitHub for more details!";
        } else if (message.includes('thank')) {
            return "You're welcome! Let me know if you have any other questions!";
        } else {
            return "I'm not sure about that. You can ask me about my skills, experience, education, certifications, or how to contact me!";
        }
    }

    // Send message on button click
    if (sendMessage) {
        sendMessage.addEventListener('click', sendUserMessage);
    }

    // Send message on Enter key
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('.submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Show success message
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    formMessage.className = 'form-message success';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Something went wrong');
                }
            } catch (error) {
                // Show error message
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
                formMessage.className = 'form-message error';
            } finally {
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Send Message';
            }
        });
    }
});