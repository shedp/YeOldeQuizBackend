const Game = require("../models/Game")

const socketEvents = (socket) => {
    console.log("User Connected")

    socket.on("disconnect", () => console.log("User has disconnected"))

    socket.on("create-game", ({join_code, level, topics}) => {
        try{
            console.log(`Lobby created with join code: ${join_code}`)
            socket.join(join_code)
        } catch(err){
            console.log(err);
            socket.emit('error','couldnt perform create action');
        }
        
    })

    socket.on("join-game", ({join_code, username}) => {
        try{
            console.log(`${username} has joined the lobby (${join_code})`)
            socket.join(join_code);            
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
}

module.exports = socketEvents
