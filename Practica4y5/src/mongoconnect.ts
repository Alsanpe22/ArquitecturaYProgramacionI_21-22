import {MongoClient } from "mongodb";


const mongoConnect = async(url: string) => {
    const client = new MongoClient(url);
    return await client.connect()
}

export default mongoConnect;
