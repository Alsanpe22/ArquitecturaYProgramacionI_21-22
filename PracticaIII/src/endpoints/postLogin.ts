import { IUser } from "../mongotypes";
import { Request, Response } from "express"
import { Collection, Db } from "mongodb";
import { app } from "../server"
import {v4 as uuidv4} from "uuid"


//const {v4: uuidv4} = require ('uuid');


const postLogin = async (req: Request, res: Response) => {
    try{
        const db:Db = app.get("db");
        const UserCollection: Collection<IUser> = db.collection<IUser>("User");
        const user: IUser | null = await UserCollection.findOne({mail: req.body.mail, password: req.body.password});
        if(user){
           req.body.token = uuidv4();
           console.log(req.body.token);
           res.status(200).send("Ok");
        }else{
            res.status(401).send("Error")
        }
    }catch(e){ console.log(e)}

}

export default postLogin