import { Request, Response } from "express";
import Review from "../models/review";
import { Review as ReviewType } from "../types/review";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";


class ReviewsControllers {

    //Obtener todas las reviews existentes
    getAll(req: Request, res: Response){
        Review.find({}).then((response: ReviewType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };
    
    //Obtener todas las reseñas de un restaurant
    getRestaurantReviews(req: Request, res: Response){
        const { restaurantId } = req.body.parameters;
        Review.find({ restaurantId:  restaurantId }).then((reviewList: ReviewType[] | undefined) => {
            if(reviewList) {
                res.send(reviewList)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Reseña no encontrada" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };

    //Crear una nueva reseña a partir del ususario y el restaurant
    createReview(req: Request, res: Response){
        const { userId, restaurantId, score, content, priority} = req.body.parameters;
        const newReview = new Review({ userId, restaurantId, score, content, priority});
        newReview.save().then((review: ReviewType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(review);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Borrar una review ya existente
    deleteReview(req: Request, res: Response){
        const { _id } = req.body.parameters;
        Review.findOneAndDelete({ _id: _id }).then((deletedReview: ReviewType | null) => {
            if (deletedReview) {
                res.send({ message: "Reseña eliminada correctamente" });
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Reseña no encontrada" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Actualizar una review ya existente
    updateReview(req: Request, res: Response){
        const { _id } = req.body.parameters;
        const updateReview = req.body.update;
        Review.findOneAndUpdate({ _id: _id }, updateReview, { new: true }).then((updatedReview: ReviewType | undefined) => {
            if (updatedReview) {
                res.send(updatedReview);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Reseña no encontrada" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };
    
}

const reviewsControllers = new ReviewsControllers();
export default reviewsControllers;