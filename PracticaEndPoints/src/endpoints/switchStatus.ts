import { Collection, Db } from "mongodb";
import { ICharacters } from "../mongotypes";
import mongoImport from "../mongoimport";
import { Request, Response } from "express";
  
  const switchStatus = ( async(req: Request, res: Response)=> {
      try{
          const db: Db = await mongoImport();
          const CharactersCollection: Collection<ICharacters> = db.collection<ICharacters>("Characters");
          const character = await CharactersCollection.findOne({id:Number(req.params.id)});
          if(character){
            await CharactersCollection.updateOne({id:Number(req.params.id)},{$set: {status:character.status === "Alive" ? "Dead" : "Alive"}})//se se cumple alive me devuelves dead y si no alive
            return res.status(200).send({
              id: character?.id, //ICharacter o null
              name: character?.name,
              status: character?.status,
              episode: character?.episode
              //getcharacterid
          })
          }return res.status(404).send("Not found");
          
  
      }catch(e){
          console.log(e);
      }
  })
  
  
  export default switchStatus;