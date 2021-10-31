import { Collection, Db } from "mongodb";
import { ICharacters } from "../mongotypes";
import mongoImport from "../mongoimport";
import { Request, Response } from "express";

const getCharactersId = ( async(req: Request, res: Response)=> {
    try{
        const db: Db = await mongoImport();
        const CharactersCollection: Collection<ICharacters> = db.collection<ICharacters>("Characters");
        const character = await CharactersCollection.findOne({id:Number(req.params.id)});
        return res.status(200).send({
            id: character?.id, //ICharacter o null
            name: character?.name,
            status: character?.status,
            episode: character?.episode
        }) 

    }catch(e){
        console.log(e);
    }
})


export default getCharactersId;