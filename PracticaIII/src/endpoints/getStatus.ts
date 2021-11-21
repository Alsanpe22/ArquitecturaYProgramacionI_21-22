import {Request, Response} from "express"
import {app} from "../server"

const getStatus = (req: Request, res: Response) => {
    try{
        const db = app.get("db");

        const date:Date = new Date();
        res.status(200).send(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
        
    }catch(e){console.log(e)}

}

export default getStatus;