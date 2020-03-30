const SocketIO = require("socket.io");
const { RateLimiterMemory } = require("rate-limiter-flexible");

// store all users
let users = [];
// define limits
const userLimit = 100;
const usernameLimit = 16;
const messageLimit = 240;

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 points
  duration: 30 // per second
});

const addUser = ({ id, username }) => {
  try {
    // Check if chatroom is full
    if (users.length === userLimit || users.length > userLimit) {
      return { error: "Chatroom is full. Please come back later." };
    }

    // Validate the data
    if (!username) {
      return { error: "Username is required." };
    }

    // Clean the data
    username = username.trim().toLowerCase();

    // Check username length
    if (username.length === 0 || username.length > usernameLimit) {
      return {
        error: `Username cannot be more than ${usernameLimit} characters.`
      };
    }

    // Check if a user has this username
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return { error: "This username already exists." };
    }

    // Store user
    const user = { id, username };
    users.push(user);
    return { user };
  } catch (err) {
    return { error: "Something went wrong. Please try again." };
  }
};

const removeUser = socketId => {
  // Get index of user to remove
  const index = users.findIndex(user => user.id === socketId);

  // Remove user from list of all users
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = server => {
  const io = SocketIO(server);

  io.on("connection", socket => {
    console.log("A user connected");

    // Add user to chatroom
    socket.on("join", data => {
      const { error, user } = addUser({ id: socket.id, ...data });

      if (error) {
        console.log(error);
      }

      // Save username so that it can referenced on leave or disconnect
      if (user) {
        socket.username = user.username;
        console.log("A user joined chat");
      }

      io.emit("join", { users, error, user });
    });

    // Send/receive messages
    socket.on("sendMessage", async ({ username, message }) => {
      try {
        // check if user has gone over rate limit. consume 1 point per event from IP
        await rateLimiter.consume(socket.id);

        // Clean the data
        message = message.trim();

        // Check message character limit
        if (message.length === 0 || message.length > messageLimit) {
          const error = `Messages must between 1 and ${messageLimit} characters.`;
          return io.to(`${socket.id}`).emit("messageError", error);
        }

        socket.broadcast.emit("newMessage", { username, message });
      } catch (err) {
        // rate limit reached. no available points to consume
        socket.emit("rateLimitReached", {
          error: `Rate limit reached. Try again in ${Math.round(
            err.msBeforeNext / 1000
          )} seconds`
        });
      }
    });

    // Remove user from chatroom on manual leave, such as clicking a button
    socket.on("leave", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.emit("leave", { users, username: socket.username });
      }

      console.log("A user left chat");
    });

    // Remove user from chatroom when user is disconnected, such as exiting site
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.emit("leave", { users, username: socket.username });
      }
      console.log("A user disconnected");
    });
  });
};
