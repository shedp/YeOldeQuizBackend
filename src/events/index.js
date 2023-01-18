const Game = require("../models/Game");
const { io } = require("../server_socket");

const socketEvents = (socket) => {
  let adminSocketID = "";

  console.log("User Connected");

  socket.on("disconnect", () => console.log("User has disconnected"));

  socket.on("hello", () => console.log("hello"));

  socket.on("question", (question, answer) => {
    //emit to all sockets
    socket.to(join_code).emit("", question, answer);
  });

  socket.on("create-game", async ({ join_code, user_id, level, topics }) => {
    try {
      console.log(`Lobby created with join code: ${join_code}`);
      await socket.join(join_code);
      console.log(socket.id);
      const sockets = await io.in(join_code).fetchSockets();
      const socketIDs = sockets.map((socket) => socket.id);

      io.to(join_code).emit("update-users", socketIDs);
      adminSocketID = socket.id;
    } catch (err) {
      console.log(err);
      socket.emit("error", "couldnt perform create action");
    }
  });

  socket.on("join-game", async ({ join_code, username }) => {
    try {
      console.log(`${username} has joined the lobby (${join_code})`);
      await socket.join(join_code);
      console.log(socket.id);
      const sockets = await io.in(join_code).fetchSockets();
      const socketIDs = sockets.map((socket) => socket.id);
      if (socketIDs.length > 4) {
        await socket.leave(join_code);
        io.to(socket.id).emit("max-users-error", "Lobby full");
      } else {
        io.to(join_code).emit("update-users", socketIDs);
      }
    } catch (err) {
      console.log(err);
      socket.emit("error", "couldnt perform join action");
    }
  });

  //   socket.on("fetch-users", async ({ join_code }, cb) => {
  //     let clients = await io.in(join_code).fetchSockets();
  //     const socketIds = clients.map((socket) => socket.id);
  //     cb(socketIds);
  //     console.log(socketIds);
  //   });

  socket.on("leave-room", ({ join_code, username }) => {
    try {
      console.log(`${username} has left the lobby (${join_code})`);
      socket.leave(join_code);
    } catch (err) {
      console.log(err);
      socket.emit("error", "couldnt perform leave action");
    }
  });

  socket.on("start-game", ({ join_code }) => {
    console.log(join_code);
    try {
      if (socket.id == adminSocketID) {
        socket.to(join_code).emit("game-starting");
        console.log("Broadcasting to all users that game is starting");
      }
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = socketEvents;
