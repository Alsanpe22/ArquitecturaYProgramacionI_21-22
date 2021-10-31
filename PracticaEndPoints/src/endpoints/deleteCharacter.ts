import { Collection, Db } from "mongodb";
import { ICharacters } from "../mongotypes";
import mongoImport from "../mongoimport";
import { Request, Response } from "express";

const deleteCharacter = ( async(req: Request, res: Response)=> {
    try{
        const db: Db = await mongoImport();
        const CharactersCollection: Collection<ICharacters> = db.collection<ICharacters>("Characters");
        const {deletedCount} = await CharactersCollection.deleteOne({id:Number(req.params.id)});
        if(deletedCount){
        return res.status(200).send("OK") }
        return res.status(404).send("Not found")

    }catch(e){
        console.log(e);
    }
})


export default deleteCharacter;