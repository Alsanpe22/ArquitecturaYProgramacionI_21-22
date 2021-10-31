import { Collection, MongoClient } from "mongodb";
import { ICharacters } from "./mongoTypes";
const mongoConnect = async(url: string) => {
    const client = new MongoClient(url);
    return await client.connect()
}

export default mongoConnect;