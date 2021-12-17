import { ApolloError } from "apollo-server-express";
import { IContext, Recipe } from "../src/schemasmongo";
import {Db, Collection, ObjectId} from "mongodb";
import { User } from "../src/schemasmongo";
import { v4 as uuidv4 } from 'uuid';
import { request } from "http";
import { idText } from "typescript";

const Query = {
    getRecipes: async(parents: any, args: {input: {author: string, ingredients: [], token: String}}, ctx: IContext): Promise<void> => {
        try{
            const db:Db = ctx.db;
            const RecipeCollection: Collection<Recipe> = db.collection<Recipe>("Recipes");
            const UserCollection: Collection<User> = db.collection<User>("User");
            const user : User |null = await UserCollection.findOne({token: args.input.token});
            if(user){
                    const ingredients = await RecipeCollection.find({$or: [{ingredients: []}, {ingredients: []}]}).toArray();
                   // return ingredients.map((elem) => return elem.ingredients);
                }





    }catch(e){
        throw new ApolloError(`${e}`);
    }
},
    getRecipe: async(parents: any, args: {input: { id: string, name: string, description: string, ingredients: [], author: string}}, ctx: IContext) => {
        try{
            const db: Db = ctx.db;
            const RecipeCollection: Collection<Recipe> = db.collection<Recipe>("Recipes");
            const recipes = await RecipeCollection.findOne({id:Number(args.input.id)});
            
            if(recipes){
                const newObj: Recipe = {
                    name: args.input.name,
                    description: args.input.description,
                    ingredients: args.input.ingredients,
                    _id: new ObjectId
                }
                return newObj;
            }
                
            }catch(e){
                throw new ApolloError(`${e}`);
            } 
    
        },
    }
    export default Query;