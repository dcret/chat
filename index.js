const WebSocket = require("ws");
const express = require('express');
const path = require('path');

const app = express();
app.use('/', express.static(path.resolve(__dirname, "../client")));

const server = app.listen(9876);
const wsServer = new WebSocket.Server({
    noServer: true
});

wsServer.on("connection", function (ws) {
    ws.on("message", function (msg) {
        console.log("message", msg.toString())
        wsServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        })
    })
});


server.on('upgrade', async function upgrade(request, socket, head) {


    if (Math.random() > 0.5) {
        return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii")
    }

    //emit connection when request accepted
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
        wsServer.emit('connection', ws, request);
    });
});