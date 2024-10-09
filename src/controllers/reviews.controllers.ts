import { Request, Response } from "express";
import Review from "../models/review";
import { Review as ReviewType } from "../types/review";


class ReviewsControllers {

    //Obtener todas las reviews existentes
    getAll(req: Request, res: Response){
        res.send('reviews')
    };
    
    //Obtener todas las reseñas de un restaurant
    getRestaurantReviews(req: Request, res: Response){};

    //Crear una nueva reseña a partir del ususario y el restaurant
    createReview(req: Request, res: Response){};

    //Borrar una review ya existente
    deleteReview(req: Request, res: Response){};

    //Actualizar una review ya existente
    updateReview(req: Request, res: Response){};
    
}

const reviewsControllers = new ReviewsControllers();
export default reviewsControllers;