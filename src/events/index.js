const Game = require("../models/Game")

const socketEvents = async (socket) => {
    console.log("User Connected")

    socket.on("disconnect", () => console.log("User has disconnected"))

    socket.on("hello", () => console.log("hello"))

    socket.on("create-game", async ({join_code, level, topics}) => {
        try{
            console.log(`Lobby created with join code: ${join_code}`)
            socket.join(join_code)
            let clients = await socket.in(join_code).fetchSockets();
            console.log(clients)
        } catch(err){
            console.log(err);
            socket.emit('error','couldnt perform create action');
        }
    })

    socket.on("join-game", ({join_code, username}) => {
        try{
            console.log(`${username} has joined the lobby (${join_code})`)
            socket.join(join_code); 
            const users = Object.keys(socket.sockets.adapter.rooms[joinCode].sockets)
            socket.to(joinCode).emit("updateUsers",users)
            
            socket.on("updateUsers", (joinCode)=> {
                const users = object.keys(sockst.sockets.adapter.rooms[JoinCode].sockets)
                socket.to(joinCode).emit("updateUsers",users)
            })
        } catch(err){
            console.log(err);
            socket.emit('error','couldnt perform join action');
        }
    })
    
    socket.on("leave-room", ({join_code, username}) => {
        try{
            console.log(`${username} has left the lobby (${join_code})`)
            socket.leave(join_code);         
        } catch(err){
            console.log(err);
            socket.emit('error','couldnt perform leave action');
        }
    })

    socket.on("start-game", ({join_code}) => {
        try{
            console.log("Broadcasting to all users that game is starting")
            socket.to(join_code).emit("game-starting")
        } catch(err){
            console.log(err);
        }
    })
}

module.exports = socketEvents
