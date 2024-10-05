import { Request, Response } from "express";
import Restaurant from '../models/restaurant';
import { Restaurant as RestaurantType } from "./../types/restaurant"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class RestaurantsControllers {
    getAll(req: Request, res: Response){
        Restaurant.find({}).then((response: RestaurantType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }
}

const restaurantsController = new RestaurantsControllers();
export default restaurantsController;