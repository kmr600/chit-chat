const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res, next) => {
  res.status(200).json({ success: true, msg: "Successful request" });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port ${PORT}\n`));
