import { Request, Response } from "express";


class ReviewsControllers {
    getAll(req: Request, res: Response){
        res.send('reviews')
    }
}

const reviewsControllers = new ReviewsControllers();
export default reviewsControllers;