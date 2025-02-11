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
let currentPlayer="w"

app.set("view engine", "ejs"); //to use ejs

app.use(express.static(path.join(__dirname,"public")));  //to use static files like images,vanillajs,fonts,videos etc

app.get("/", (req, res) => {
    res.render("index",{title:"Chess Game"});
    });

    io.on("connection", function(uniquesocket){
        console.log("connected");

        if(!players.white){
            players.white=uniquesocket.id;
            uniquesocket.emit("playerRole","w"); //if white player is not present then the connected person is assigned white
            }

            else if(!players.black){
                players.black=uniquesocket.id;
                uniquesocket.emit("playerRole","b");
            }

            else{
                uniquesocket.emit("spectatorRole");
            }

            uniquesocket.on("disconnect", function(){
             
                if(uniquesocket.id===players.white){
                    delete players.white;}
                else if(uniquesocket.id===players.black){
                    delete players.black;}

                });

                uniquesocket.on("move", (move)=>{
                try{
                    if(chess.turn()==='w' && uniquesocket.id!==players.white) return;
                    if(chess.turn()==='b' && uniquesocket.id!==players.black) return;

                    //making sure that only the correct player makes the move

                    const result=chess.move(move);
                    if(result){                //means if the move is correct
                    currentPlayer=chess.turn();
                    io.emit("move",move);     //io.emit means send this move to everyone inlcuding the spectators,uniquesocket.emit means send this move to only the person who made the move
                    io.emit("boardState",chess.fen());
                    }

                    else{
                        console.log("Invalid move: ", move);
                        uniquesocket.emit("invalidMove",move);
                    }

                }catch (err){
                    console.log(err);
                   uniquesocket.emit("Invalid move : ", move);
                
                }

                
            
            });
           
        });
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});





