import { Db } from "mongodb"
import { Request, Response } from "express"
// Characters
export type ICharacters = {
    id: number,
    name: string;
    status: string;
    species: string;
    episode: Array<IEpisodes>
}

export type IEpisodes = {
    name: string;
    episode: string;
}

