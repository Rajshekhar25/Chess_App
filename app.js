const express = require("express");
const socket= require("socket.io");

const { Chess }=require ("chess.js");
const path = require("path");

const app = express();
const http = require("http");
const { title } = require("process");


const server = http.createServer(app);
                                           //http ka ek server banake link to express..and socket will run that server
const io=socket(server);

const chess=new Chess();

let players={};
let currentPlayer="W"

app.set("view engine", "ejs"); //to use ejs

app.use(express.static(path.join(__dirname,"public")));  //to use static files like images,vanillajs,fonts,videos etc

app.get("/", (req, res) => {
    res.render("index",{title:"Chess Game"});
    });

    io.on("connection", function(uniquesocket){
        console.log("connected");

        uniquesocket.on("disconnect",function(){
            console.log("disconnected");
        });
    });

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});





