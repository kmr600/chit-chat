const SocketIO = require("socket.io");

// store all users
let users = [];
// define user limit
const userLimit = 100;

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
    socket.on("sendMessage", ({ username, message }) => {
      socket.broadcast.emit("newMessage", { username, message });
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
