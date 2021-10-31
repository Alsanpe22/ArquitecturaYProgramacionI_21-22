import { Request, Response } from "express";

export const getStatus = (req: Request, res: Response) => {
   try{  res.status(200);
       res.send("OkProgramacion-I");
}catch(e){console.log(e)}
          
   
}


