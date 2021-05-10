const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 4000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'client/build/index.html');
});

if (process.env.NODE_ENV === "production") {
    console.log("In Production");
    app.use(express.static("client/build"));
}

// Start the server
server.listen(PORT, function () {
  console.log(`🌎  ==> Socket Server now listening on PORT ${PORT}!`);
});

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  }
);

let equations = [];

io.on("connection", socket => {
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

