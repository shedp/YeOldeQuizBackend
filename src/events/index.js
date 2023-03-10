const Game = require("../models/Game");
const { io } = require("../server_socket");

let usersCompleted = 0;
let usersSent = 0;
let adminSocketID = "";
let scores = [];
let finalScores = [];
let users = [];

const socketEvents = (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => console.log("User has disconnected"));

  socket.on("hello", () => console.log("hello"));

  socket.on("question", (question, answer) => {
    //emit to all sockets
    socket.to(join_code).emit("", question, answer);
  });

  socket.on("create-game", async ({ gameInfo, username }) => {
    try {
      console.log(`Lobby created with join code: ${gameInfo.join_code}`);
      await socket.join(gameInfo.join_code);
      // console.log(socket.id);
      // const sockets = await io.in(gameInfo.join_code).fetchSockets();
      // const socketIDs = sockets.map((socket) => socket.id);
      users = [username];

      io.to(gameInfo.join_code).emit("update-users", users);
      adminSocketID = socket.id;

      io.to(socket.id).emit("set-admin", true);
    } catch (err) {
      console.log(err);
      socket.emit("error", "couldnt perform create action");
    }
  });

  socket.on("join-game", async ({ join_code, username }) => {
    try {
      console.log(`${username} has joined the lobby (${join_code})`);
      await socket.join(join_code);
      // console.log(socket.id);
      const sockets = await io.in(join_code).fetchSockets();
      const socketIDs = sockets.map((socket) => socket.id);
      if (socketIDs.length > 4) {
        await socket.leave(join_code);
        io.to(socket.id).emit("max-users-error", "Lobby full");
      } else {
        users = [...users, username];
        io.to(join_code).emit("update-users", users);
      }
    } catch (err) {
      console.log(err);
      socket.emit("error", "couldnt perform join action");
    }
  });

  socket.on("leave-game", async ({ join_code, username }) => {
    try {
      console.log(`${username} has left the lobby (${join_code})`);
      socket.leave(join_code);
      const sockets = await io.in(join_code).fetchSockets();
      const socketIDs = sockets.map((socket) => socket.id);

      // remove user
      const index = users.indexOf(username);
      users.splice(index, 1);
      console.log(users);

      io.to(socket.id).emit(
        "disconnect-user",
        (socket.id, "User has left the lobby")
      );

      io.to(join_code).emit("update-users", users);
    } catch (err) {
      console.log(err);
      socket.emit("error", "couldnt perform leave action");
    }
  });

  socket.on("start-game", ({ join_code }) => {
    // console.log(join_code);
    try {
      if (socket.id == adminSocketID) {
        socket.to(join_code).emit("game-starting");
        console.log("Broadcasting to all users that game is starting");
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("send-questions", (questionsInfo, join_code) => {
    try {
      io.to(join_code).emit("receive-questions", questionsInfo);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("user-complete", async (join_code, scoreObj) => {
    console.log(scoreObj);
    try {
      const sockets = await io.in(join_code).fetchSockets();
      const socketIDs = sockets.map((socket) => socket.id);
      console.log("usersCompleted", usersCompleted);
      console.log("socketlength", socketIDs.length);
      usersCompleted += 1;
      scores = [...scores, scoreObj];
      if (usersCompleted < socketIDs.length) {
        console.log("waiting room");
        socket.join(`waiting${join_code}`);
        await io
          .to(`waiting${join_code}`)
          .emit("wait-for-others", usersCompleted, socketIDs.length);
      } else {
        console.log("All Users Complete");
        await io.to(join_code).emit("next-round", scores);
        usersCompleted = 0;
        scores = [];
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("leave-waiting", async (join_code) => {
    try {
      socket.leave(`waiting${join_code}`);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("pass-finalscores", async (join_code, scoreObj) => {
    console.log("scoreobj", scoreObj);
    try {
      const sockets = await io.in(join_code).fetchSockets();
      const socketIDs = sockets.map((socket) => socket.id);
      finalScores = [...finalScores, scoreObj];
      usersSent += 1;
      if (usersSent < socketIDs.length) {
        socket.join(`waiting${join_code}`);
        await io
          .to(`waiting${join_code}`)
          .emit("waiting-for-scores", usersSent, socketIDs.length);
      } else {
        console.log("finalScores", finalScores);
        await io.to(join_code).emit("redirect-to-results", finalScores);

        usersSent = 0;
        finalScores = [];
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("did-i-win", async (winner_id, join_code) => {
    try {
      if (socket.id == winner_id) {
        console.log("Winner");
        io.to(socket.id).emit("winner");
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("leave-end-lobby", async (join_code) => {
    try {
      socket.leave(join_code);
      io.to(socket.id).emit("left-end-lobby");
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("pass-game-id", async ({ game_id, join_code }) => {
    try {
      await io.to(join_code).emit("receive-game-id", game_id);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = socketEvents;
