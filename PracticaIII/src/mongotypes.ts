export type IUser={
    mail:string,
    password:string,
    token?:string | null
}

export type IBook={
    date: Date,
    user: string
}

export type IBookbyDMY={
    day: number,
    month: number,
    year: number,
    place: number
}

export type IBookPlace={
    id:number,
    places: Array<IBook>
}