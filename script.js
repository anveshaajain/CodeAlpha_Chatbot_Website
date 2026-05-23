// Predefined training data / knowledge base for commercial use
const botKnowledgeBase = [
    {
        keywords: ["hello", "hi", "hey", "greetings"],
        response: "Hello! Welcome to our service. How can I assist you today?"
    },
    {
        keywords: ["services", "what do you do", "features"],
        response: "We offer web development, cloud migration systems, and AI automation tools tailored for businesses."
    },
    {
        keywords: ["price", "cost", "pricing", "fees"],
        response: "Our basic business plans start at $29/month. Would you like a link to our detailed pricing page?"
    },
    {
        keywords: ["contact", "support", "email", "phone", "help"],
        response: "You can reach our support team 24/7 at support@company.com or call us at 1-800-555-0199."
    },
    {
        keywords: ["hours", "time", "open"],
        response: "Our digital services run 24/7, and our live human support agents are available Monday to Friday, 9 AM - 6 PM."
    }
];

// Fallback response if the bot doesn't understand the pattern
const defaultResponse = "I'm not sure I understand that entirely. Could you try rephrasing or asking about our services, pricing, or contact info?";

// DOM Elements
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Function to handle sending a message
function handleSendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // 1. Display User Message
    appendMessage(text, "user-message");
    userInput.value = ""; // Clear input field

    // 2. Process Bot Response after a slight natural delay
    setTimeout(() => {
        const botReply = getBotResponse(text);
        appendMessage(botReply, "bot-message");
    }, 500);
}

// Function to scan knowledge base for matches
function getBotResponse(userMessage) {
    // Convert to lowercase to make checking case-insensitive
    const lowerMessage = userMessage.toLowerCase();

    // Loop through our knowledge base rules
    for (let item of botKnowledgeBase) {
        for (let keyword of item.keywords) {
            if (lowerMessage.includes(keyword)) {
                return item.response; // Match found
            }
        }
    }
    return defaultResponse; // No match found
}

// Function to inject a message bubble into the chat window
function appendMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    
    // Auto scroll down to the newest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event Listeners for click and hitting "Enter" key
sendBtn.addEventListener("click", handleSendMessage);
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSendMessage();
    }
});