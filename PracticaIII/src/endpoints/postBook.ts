import { IUser, IBookPlace, IBookbyDMY } from "../mongotypes";
import { Request, Response } from "express";
import { Collection, Db } from "mongodb";
import { app } from "../server";

const postBook = async (req: Request, res: Response) =>{
    try{
        const db:Db = app.get("db");
        const BookCollection: Collection<IBookPlace> = db.collection<IBookPlace>("Book");
        const UserCollection: Collection<IUser> = db.collection<IUser>("User");
        const user : IUser |null = await UserCollection.findOne({token: req.body.token});
        if(user){
            const today: Date = new Date();
            const bookDate: Date = new Date(`${req.body.getDate()}/${req.body.getMonth()}/${req.body.getFullYear()}`)
            if(!((req.body.place > 20) || (req.body.place < 1))){
                if((bookDate > today) || ((bookDate.getDate() === today.getDate()) && (bookDate.getMonth() === today.getMonth()) && (bookDate.getFullYear() === today.getFullYear()))){
                    const seat = await BookCollection.find({$or: [{id: req.body.place, places: []}, {id: req.body.place, places: {data: {$ne: bookDate}}}]}).toArray();
                    if(seat && (seat.length !== 0)){
                        await BookCollection.updateOne({id: req.body.seat}, {$set: {ocupation: [...seat[0].places, {date: bookDate, user: user.mail}]}})
                         res.status(200).send({
                            place: req.body.seat,
                            date: bookDate
                        })
                    }
                    
        }else{
            res.status(404).send("Error")
        }
    }
} 
    }catch(e){console.log(e); res.status(500).send("Error")}}

    export default postBook;