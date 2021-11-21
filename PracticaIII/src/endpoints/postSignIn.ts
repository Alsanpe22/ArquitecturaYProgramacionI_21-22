import { IUser } from "../mongotypes";
import { Request, Response } from "express"
import { Collection, Db } from "mongodb";
import { app } from "../server"

const postSignIn = async(req: Request, res: Response) =>{
    try{
        const db:Db = app.get("db");
        const UserCollection: Collection<IUser> = db.collection<IUser>("User");
        const user: IUser | null = await UserCollection.findOne({mail: req.body.mail});
        if(user){
            res.status(409).send("Ya existe este usuario")
        }else{
            await UserCollection.insertOne({...req.body, token:null})
            res.status(200).send("Ok")
        }

    }catch(e){ console.log(e)}



}

export default postSignIn