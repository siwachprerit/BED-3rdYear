const { WebSocketServer } = require('ws');

const ws = new WebSocketServer({ port: 8015 });
//event-handler
ws.on("connection",function(socket){
    console.log(socket);
    
    setInterval(()=>{
        socket.send("Reliance Stock Price is "+" "+Math.random()*1000);
    },500)

    socket.on('message', function message(data) {
    console.log(data);
    });
    
})

//app.get("/",(req,res)=>{})