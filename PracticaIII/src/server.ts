import { MongoClient } from "mongodb";
import mongoConnect from "./mongoconnect";
import express from "express";
import getStatus from "./endpoints/getStatus";
import postSignIn from "./endpoints/postSignIn";
import postLogout from "./endpoints/postLogout";
import postLogin from "./endpoints/postLogin";
import postBook from "./endpoints/postBook";
import getFreeSeats from "./endpoints/getFreeSeats";
import getMyBookings from "./endpoints/getMybookings";




export const app = express();

const run = async()=>{
    try{
        const client: MongoClient = await mongoConnect("mongodb+srv://alsanpe:nebrija@clusternebrija.qdkdq.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        app.set("db", client.db("Practica3"));
    }catch(e){ console.log(e)}
}


    run();
    app.use(express.json());
    app.get("/status", getStatus);
    app.post("/signin", postSignIn);
    app.post("/login", postLogin);
    app.post("/logout", postLogout);
    app.get("/freeseats", getFreeSeats);
    app.post("/book", postBook);
    app.get("/mybookings", getMyBookings);

    
    app.listen({port:8000}, () => {
        console.log('The application is listening on port 8000!');
       })
       


