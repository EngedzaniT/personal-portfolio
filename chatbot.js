function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        // Display user's message
        appendMessage(userInput, 'user');
        document.getElementById('user-input').value = "";

        // Get bot response (simple example with pre-defined answers)
        const botResponse = getBotResponse(userInput);
        setTimeout(() => appendMessage(botResponse, 'bot'), 1000);
    }
}

function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('bot-message');
    }

    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function getBotResponse(userMessage) {
    // Simple pre-defined responses (this can be expanded)
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes('hello')) {
        return "Hi! How can I help you today?";
    } else if (lowerCaseMessage.includes('how are you')) {
        return "I'm doing great, thank you for asking!";
    } else if (lowerCaseMessage.includes('bye')) {
        return "Goodbye! Have a nice day!";
    } else {
        return "I'm sorry, I didn't quite understand that.";
    }
}