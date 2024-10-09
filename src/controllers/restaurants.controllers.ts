import { Request, Response } from "express";
import Restaurant from '../models/restaurant';
import { Restaurant as RestaurantType } from "./../types/restaurant"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class RestaurantsControllers {

    //Obtener todos los restaurantes existentes
    getAll(req: Request, res: Response){
        Restaurant.find({}).then((response: RestaurantType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    //Obtener la información de un restaurant
    getRestaurants(req: Request, res: Response){};
    
    //Obtener todos los restaurantes de una categoría (Igual podemos dejarlo usar más filtros)
    getRestaurantByCategory(req: Request, res: Response){};

    //Crear un nuevo establecimiento
    createRestaurant(req: Request, res: Response){};

    //Borrar un restaurant de la base
    deleteRestaurant(req: Request, res: Response){};

    //Actualizar un negocio ya existente
    updateRestaurant(req: Request, res: Response){};
}

const restaurantsController = new RestaurantsControllers();
export default restaurantsController;