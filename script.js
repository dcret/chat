const url = "ws://localhost:9876/myWebsocket"
const wsServer = new WebSocket(url)

//DOM Elements
const messages = document.getElementById("messages")
const input = document.getElementById("message")
const sendBtn = document.getElementById("send")

sendBtn.disabled = true
sendBtn.addEventListener("click", sendMsg, false)

//Sending message from client
function sendMsg() {
    const text = input.value
    msgGeneration(text, "Client")
    wsServer.send(text)
}

//Creating DOM element to show received messages on browser page
function msgGeneration(msg, from) {
    const newMessage = document.createElement("h5")
    newMessage.innerText = `${from} says: ${msg}`
    messages.appendChild(newMessage)
}

//enabling send message when connection is open
wsServer.onopen = function () {
    sendBtn.disabled = false
}

//handling message event
wsServer.onmessage = function (event) {
    const { data } = event
    msgGeneration(data, "Server")
}