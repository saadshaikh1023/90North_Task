let currentReceiverId = null;
let chatSocket = null;

document.addEventListener('DOMContentLoaded', function() {
    // Toggle users list
    document.getElementById('toggle-users').addEventListener('click', function() {
        document.querySelector('.users-list').classList.toggle('collapsed');
    });

    // User selection
    document.querySelectorAll('.user-item').forEach(item => {
        item.addEventListener('click', function() {
            const userId = this.dataset.userId;
            connectToUser(userId);
        });
    });

    // Send message
    document.getElementById('send-button').addEventListener('click', sendMessage);
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

function connectToUser(userId) {
    currentReceiverId = userId;
    
    // Close existing connection if any
    if (chatSocket) {
        chatSocket.close();
    }

    // Connect to WebSocket
    chatSocket = new WebSocket(
        'ws://' + window.location.host + '/ws/chat/' + userId + '/'
    );

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        displayMessage(data.message, data.sender);
    };

    // Load previous messages
    loadMessages(userId);
}

function loadMessages(userId) {
    fetch(`/chat/messages/${userId}/`)
        .then(response => response.json())
        .then(messages => {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML = '';
            messages.forEach(msg => {
                displayMessage(msg.content, msg.sender);
            });
        });
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message && currentReceiverId && chatSocket) {
        chatSocket.send(JSON.stringify({
            'message': message,
            'receiver_id': currentReceiverId
        }));
        messageInput.value = '';
    }
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(
        sender === document.querySelector('.user-header h3').textContent
            ? 'sent'
            : 'received'
    );
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}