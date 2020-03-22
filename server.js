const http = require("http");
const express = require("express");

const sockets = require("./sockets");

const app = express();
const server = http.createServer(app);
sockets(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port ${PORT}\n`));
