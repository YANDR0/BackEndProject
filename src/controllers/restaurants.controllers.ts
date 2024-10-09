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
    getRestaurants(req: Request, res: Response){
        const { restaurantId } = req.body;
        Restaurant.find({ userId: restaurantId }).then((restaurant: RestaurantType | undefined) => {
            if(restaurantId) {
                res.send(restaurantId)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Restaurant no encontrado" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };
    
    //Obtener todos los restaurantes de una categoría (Igual podemos dejarlo usar más filtros)
    getRestaurantsByCategory(req: Request, res: Response){
        const { category } = req.body;   //Luego reviso si puedo poner ids yo o los tengo que robar
        Restaurant.find({ category: category }).then((restaurantList: RestaurantType[] | undefined) => {
            if(restaurantList) {
                res.send(restaurantList)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Restaurantes no encontrados" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };

    //Crear un nuevo establecimiento
    createRestaurant(req: Request, res: Response){
        const { name, rating, description, category, location, menu} = req.body;
        const newRestaurant = new Restaurant({ name, rating, description, category, location, menu });
        newRestaurant.save().then((restaurant: RestaurantType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(restaurant);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Borrar un restaurant de la base
    deleteRestaurant(req: Request, res: Response){
        const { _id } = req.body;
        Restaurant.findOneAndDelete({ _id: _id }).then((deletedRestaurant: RestaurantType | null) => {
            if (deletedRestaurant) {
                res.send({ message: "Restaurant eliminado correctamente" });
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Restaurant no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Actualizar un negocio ya existente
    updateRestaurant(req: Request, res: Response){
        const { _id } = req.body;
        const updateRestaurant = req.body;
        Restaurant.findOneAndUpdate({ _id: _id }, updateRestaurant, { new: true }).then((updatedRestaurant: RestaurantType | undefined) => {
            if (updatedRestaurant) {
                res.send(updatedRestaurant);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Restaurant no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };
}

const restaurantsController = new RestaurantsControllers();
export default restaurantsController;