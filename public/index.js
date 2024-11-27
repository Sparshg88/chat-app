const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
const ws = new WebSocket(`${wsProtocol}${window.location.host}`);
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const nameContainer = document.getElementById("name-container");
const chatContainer = document.querySelector(".chat-container");
const nameSubmitButton = document.getElementById("name-submit");
const usernameInput = document.getElementById("username");

let clientName = "Anonymous";

nameSubmitButton.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    clientName = name; // Set the user's name
    nameContainer.style.display = "none"; // Hide name input form
    console.log(chatContainer);

    chatContainer.style.display = "block"; // Show chat interface

    // Send the name to the server so it can be used for messaging
    ws.send(JSON.stringify({ type: "name", name: clientName }));
  }
});

// Handle incoming messages
ws.onmessage = (event) => {
  console.log(event);
  const message = JSON.parse(event.data);
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message.name + ": " + message.data;
  console.log(message);
  messageDiv.className = "other-message";
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Send a message to the server
function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    ws.send(JSON.stringify({ type: "chat", data: message }));
    // Add the message to the chat window
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `You: ${message}`;
    messageDiv.className = "my-message";
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll

    messageInput.value = ""; // Clear the input
  }
}
