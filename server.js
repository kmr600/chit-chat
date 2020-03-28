const http = require("http");
const express = require("express");
const helmet = require("helmet");

const sockets = require("./sockets");

const app = express();
const server = http.createServer(app);
sockets(server);

// Set security headers
app.use(helmet());

// Serve static assests in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running on port ${PORT}\n`));
