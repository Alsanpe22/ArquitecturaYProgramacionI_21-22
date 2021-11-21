import { IUser, IBookPlace, IBookbyDMY } from "../mongotypes";
import { Request, Response } from "express";
import { Collection, Db, WithId } from "mongodb";
import { app } from "../server";

const getMyBookings = async (req: Request, res: Response) =>{
    try{
        const db:Db = app.get("db");
        const UserCollection: Collection<IUser> = db.collection<IUser>("User");
        const user : IUser |null = await UserCollection.findOne({token: req.body.token});
        if(user){
            const PlaceCollection: Collection<IBookPlace> = db.collection<IBookPlace>("Place");
            const date: Date = new Date();

            const places = await PlaceCollection.find({places: {$elemMatch: {date: {$gt:date}, user: user.mail}}}).toArray();
            if(places.length !== 0){
                const aux: {id:number, date: Date}[]=[];
                places.forEach((elem)=>{
                    elem.places.forEach((elem2)=>{
                        aux.push({id: elem.id, date: elem2.date})})
                    })
                   res.status(200).send("Ok")
            }else{
                res.status(404).send("Nothing booked")
            }
         

            res.status(401).send("No token")

        }
    }catch(e){console.log(e); res.status(500).send("Error")}
}


export default getMyBookings;