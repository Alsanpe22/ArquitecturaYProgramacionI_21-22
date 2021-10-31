import { Collection, Db } from "mongodb";
import { ICharacters } from "../mongotypes";
import mongoImport from "../mongoimport";
import { Request, Response } from "express";

const getCharacters = async(req: Request, res: Response) => {
    try{
        const db: Db = await mongoImport();
        const CharactersCollection: Collection<ICharacters> = db.collection<ICharacters>("Characters");
        const allCharacters = (await CharactersCollection.find({}).toArray()).map((elem) => {
            return{
                id: elem.id,
                name: elem.name,
                status: elem.status,
                species: elem.status,
                episode: elem.episode
            }
        });
        return res.status(200).send(allCharacters);
    }catch(e){
        console.log(e);
    }
}


export default getCharacters;