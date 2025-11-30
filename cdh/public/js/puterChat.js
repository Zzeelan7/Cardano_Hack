// public/js/puterChat.js
function runPuterChat(question, callback) {
    if (!window.puter) {
        console.error("Puter SDK not loaded");
        return;
    }

    puter.ai.chat(question, { model: "gpt-5-nano" })
        .then(response => {
            // response is an object, send value to callback
            callback(response.value || response);
        })
        .catch(err => {
            console.error("Chatbot error:", err);
            callback("Chatbot error. Try again.");
        });
}
