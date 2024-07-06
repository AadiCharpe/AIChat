document.addEventListener('DOMContentLoaded', function() {
    async function sendMessage() {
        const chatWindow = document.getElementById('chat-window');
        const chatMessage = document.getElementById('chat-message');

        if (chatMessage.value.trim() !== "") {
            // User message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'chat-message user-message';
            userMessageDiv.textContent = chatMessage.value;
            chatWindow.appendChild(userMessageDiv);

            const url = 'http://elianrenteria.net:8000/chat'; // Replace with your API endpoint
            const data = { message: chatMessage.value }; // Replace with your data

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Set content type to JSON
                    },
                    body: JSON.stringify(data) // Convert data object to JSON string
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const responseData = await response.json();

                // Bot response
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot-message';
                botMessageDiv.textContent = `Bot: ${responseData.processed_message}`; // Adjust to your response format
                chatWindow.appendChild(botMessageDiv);

                // Scroll to the bottom
                chatWindow.scrollTop = chatWindow.scrollHeight;
            } catch (error) {
                console.error('Error:', error);
            }

            // Clear the input field
            chatMessage.value = "";
        }
    }

    // Expose sendMessage function to global scope
    window.sendMessage = sendMessage;
});
