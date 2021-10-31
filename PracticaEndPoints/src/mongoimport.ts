import {MongoClient, Db } from "mongodb";

const mongoImport = async(): Promise<Db> => {
    const client = new MongoClient("mongodb+srv://alsanpe:nebrija@clusternebrija.qdkdq.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    return (await client.connect()).db("RickYMorty");
}

export default mongoImport;
