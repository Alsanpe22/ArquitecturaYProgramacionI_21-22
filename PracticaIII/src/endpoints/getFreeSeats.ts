import { IUser, IBookPlace, IBookbyDMY } from "../mongotypes";
import { Request, Response } from "express";
import { Collection, Db } from "mongodb";
import { app } from "../server";

const getFreeSeats = async (req: Request, res: Response) =>{
    try{
        const db:Db = app.get("db");
        const BookCollection: Collection<IBookPlace> = db.collection<IBookPlace>("Book");
        const UserCollection: Collection<IUser> = db.collection<IUser>("User");
        const user : IUser |null = await UserCollection.findOne({token: req.body.token});
        if(user){
            const today: Date = new Date();
            const bookDate: Date = new Date(`${req.body.getDate()}/${req.body.getMonth()}/${req.body.getFullYear()}`)
            if((bookDate > today) || ((bookDate.getDate() === today.getDate()) && (bookDate.getMonth() === today.getMonth()) && (bookDate.getFullYear() == today.getFullYear()))){
                const place = await BookCollection.find({$or: [{places: []}, {places: [{date: {$ne: bookDate}}]}]}).toArray();
                return res.status(200).send(place.map((elem) => {return elem.id}))
            }else{
                res.status(500).send("Error en fecha")
            }
        }else{
            res.status(500).send("Error")
        }
    }catch(e){console.log(e); res.status(500).send("Error")}
}

export default getFreeSeats;