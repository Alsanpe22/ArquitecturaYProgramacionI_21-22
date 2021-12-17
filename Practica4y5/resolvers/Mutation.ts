import { ApolloError } from "apollo-server-express";
import { IContext, Recipe } from "../src/schemasmongo";
import {Db, Collection} from "mongodb";
import { User } from "../src/schemasmongo";
import { v4 as uuidv4 } from 'uuid';
import { request } from "http";


const Mutation = {
    SignIn: async(parents: any, args: {input: {email: string, pwd: string}}, ctx: IContext): Promise<void> => {
        try{
            //Return Promise<String> porque devuelves el token.
            const db: Db = ctx.db
            const UserCollection: Collection<User> = db.collection<User>("Users");
            const user: User | null = await UserCollection.findOne({email: args.input.email});
            if(!user){
                const newObj: User = {
                    email: args.input.email,
                    token: null,
                    pwd: args.input.pwd,
                    recipes: []
                }
                await UserCollection.insertOne(newObj);
            }
        }catch(e){
            throw new ApolloError(`${e}`);
        }
    },
    SignOut: async(parents: any, args: {}, ctx: IContext): Promise<boolean> =>{
        try{
            const userToken: string | null = ctx.request.headers.get("token");
            if(userToken){
                const db: Db = ctx.db;
                const UserCollection: Collection<User> = db.collection<User>("Users");
                const user: User | null = await UserCollection.findOne({token: userToken});
                if(user){
                    const RecipeCollecion: Collection<Recipe> = db.collection<Recipe>("Recipes");
                    const toDelete: Recipe[] = await RecipeCollecion.find({author: user}).toArray();
                    await RecipeCollecion.deleteMany(toDelete);
                    const {deletedCount} = await UserCollection.deleteOne(user);
                    if(deletedCount){
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;

        }catch(e){
            throw new ApolloError(`${e}`);
        }
    },
    LogIn: async(parents: any, args: {input: {email: string, pwd: string, token:string}}, ctx: IContext)=>{
        try{
            const db:Db = ctx.db;
            const UserCollection: Collection<User> = db.collection<User>("User");
            const user: User | null = await UserCollection.findOne({mail: args.input.email, password: args.input.pwd});
            if(user){
               args.input.token = uuidv4();
               console.log(args.input.token); 
            }
    
}catch(e){
    throw new ApolloError(`${e}`);
}
    },
    LogOut: async(parents: any, args: {input: {email: string, pwd: string, token:string}}, ctx: IContext)=>{
        try{
            const headers = ctx.request.headers.get("Token");
            if(headers){
                const db:Db = ctx.db;
                const UserCollection: Collection<User> = db.collection<User>("User");
                const {matchedCount} = await UserCollection.updateOne({token: ctx.request.headers.get("Token")}, {$set: {token:null}});
                if(matchedCount){
                    console.log("ok")
                }else{ console.log("error")}
    }



}catch(e){
    throw new ApolloError(`${e}`);
}
 },
    









}

    export default Mutation;
