import { Request, Response } from "express";
import Review from "../models/review";
import { Review as ReviewType } from "../types/review";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";
import { User as UserType } from "../types/user";
import user from "../models/user";
import _ from "lodash";


class ReviewsControllers {

    //Obtener todas las reviews existentes
    getAll(req: Request, res: Response) {
        Review.find({}).then((response: ReviewType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Obtener todas las reseñas de un restaurant
    getRestaurantReviews(req: Request, res: Response) {
        Review.find({ restaurantId: req.params.id }).then((reviewList: ReviewType[] | undefined) => {
            if (reviewList) {
                const idList = reviewList.map(review => review.userId); // Extract user IDs from reviews
                user.find({ _id: { $in: idList } }).then((userList: UserType[] | undefined) => {
                    const userMap = _.keyBy(userList, "_id");

                    const reviewsWithUser = reviewList.map(review => {
                        return {
                            ...review,
                            user: userMap[review.userId as string]
                        };
                    });
                    res.send(reviewsWithUser);
                }).catch(() => {
                    res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
                })
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Reseña no encontrada" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };

    //Crear una nueva reseña a partir del ususario y el restaurant
    createReview(req: Request, res: Response) {
        const { userId, restaurantId, rating, content } = req.body;
        const newReview = new Review({ userId, restaurantId, rating, content });
        newReview.save().then((review: ReviewType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(review);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Borrar una review ya existente
    deleteReview(req: Request, res: Response) {
        const { reviewId } = req.body;
        Review.findOneAndDelete({ _id: reviewId }).then((deletedReview: ReviewType | null) => {
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
    updateReview(req: Request, res: Response) {
        const { reviewId, ...updatedData } = req.body;
        Review.findOneAndUpdate({ _id: reviewId }, updatedData, { new: true }).then((updatedReview: ReviewType | undefined) => {
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