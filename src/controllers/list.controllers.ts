import { Request, Response } from "express";


class ListControllers {
    getAll(req: Request, res: Response){
        res.send('list')
    }
}

const listControllers = new ListControllers();
export default listControllers;