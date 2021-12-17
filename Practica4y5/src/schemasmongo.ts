import {Db, ObjectId} from "mongodb";

export type Ingredient = {
    _id: ObjectId;
    name: String;
    recipes: Array<Recipe>;
}

export type Recipe = {
    _id: ObjectId;
    name: string;
    description: string;
    ingredients: Array<Ingredient>;
}

export type User = {
    _id?: ObjectId;
    email: string;
    token: string | null;
    pwd: string;
    recipes: Array<Recipe>;
}

export type IContext = {
    db: Db,
    request: Request,
}