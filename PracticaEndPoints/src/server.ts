import express, { response } from "express";
import { Db } from "mongodb";
import {getStatus} from "./endpoints/getStatus";
import getCharacters from "./endpoints/getCharacters";
import mongoConnect from "./mongoConnect";
import getCharactersId from "./endpoints/getCharactersId";
import switchStatus from "./endpoints/switchStatus";
import deleteCharacter from "./endpoints/deleteCharacter";

//para importarlo necesitamos hacerlo de esta manera como nos indica la documetnacon
require('dotenv').config()


const app = express();
const run = async() => {
    try{

        
        const client = await mongoConnect("mongodb+srv://alsanpe:nebrija@clusternebrija.qdkdq.gcp.mongodb.net/RickYMorty?retryWrites=true&w=majority")
        const db: Db = client.db("RickYMorty")
       

    }catch(e){
        console.log(e);
    }
}

 app.get("/status", getStatus)
 app.get("/characters", getCharacters)
 app.get("/character/:id", getCharactersId)
 app.put("/switchstatus/:id", switchStatus)
 app.delete("/character/:id", deleteCharacter)

 app.listen({port:8000}, () => {
 console.log('The application is listening on port 8000!');
})







/*
app.get('/status', (req, res) => {
    res.status(200);
    res.send("OKProgramacion-I");
})

app.listen(8000, () => {
    console.log('The application is listening on port 8000!');
})

*/