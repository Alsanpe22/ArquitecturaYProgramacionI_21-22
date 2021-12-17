import { ApolloServer, gql } from "apollo-server-express"
import express from "express";
import { Db } from "mongodb";
import Schema from "./src/schema";
import Mutation from "./resolvers/Mutation"
import Query from "./resolvers/Query";

const resolvers = {
    Mutation,
    Query
}

let db: Db;

const server = new ApolloServer({
    typeDefs: Schema,
    resolvers: resolvers,
    context: (ctx) => {
        return {
            ctx,
            db
        }
    }
});

const initServer = async() => {
    try{
        await server.start();
    }catch(e){
        console.log($`{e}`);
    }
}

const app = express();

initServer()
server.applyMiddleware({
    app: app,
    path: "/"
});

app.listen(8000);
console.log("Server escuchando en el puerto 8000");