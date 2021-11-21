import { IUser } from "../mongotypes";
import { Request, Response } from "express"
import { Collection, Db } from "mongodb"
import { app } from "../server"

const postLogout = async(req: Request, res: Response) => {
    try{
        const headers: string | undefined = req.header("Token");
        if(headers){
            const db:Db = app.get("db");
            const UserCollection: Collection<IUser> = db.collection<IUser>("User");
            const {matchedCount} = await UserCollection.updateOne({token: req.header("Token")}, {$set: {token:null}});
            if(matchedCount){
                res.status(200).send("Ok")
            }else{ res.status(500).send("Error")}
        }else{
            res.status(500).send("Error") 
        }
    }catch(e){ console.log(e) }
}

export default postLogout