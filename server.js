const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 4000;

// Start the server
server.listen(PORT, function () {
  console.log(`🌎  ==> Socket Server now listening on PORT ${PORT}!`);
});

const io = require("socket.io")(server, {
    cors: {
      origin: "https://detanracnier.github.io",
      methods: ["GET", "POST"],
      credentials: true
    }
  }
);

let equations = [];

io.on("connection", socket => {
  console.log("connection made");
  socket.on("calculate", (equation) => {
    equations.push(equation);
    console.log(equations.length,"adding:",equation);
    io.emit("calculate", equations)
  })
  socket.on("initialize", () => {
    console.log("initializing");
    io.emit("calculate", equations);
  })
  socket.on('error', function (err) {
    console.log(err);
  });
});

