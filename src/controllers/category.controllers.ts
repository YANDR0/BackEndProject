import { Request, Response } from "express";


class CategoryControllers {
    getAll(req: Request, res: Response){
        res.send('category')
    }
}

const categoryControllers = new CategoryControllers();
export default categoryControllers;