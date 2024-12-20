import { Request, Response } from "express";
import Restaurant from '../models/restaurant';
import { Restaurant as RestaurantType } from "./../types/restaurant"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";

class RestaurantsControllers {

    //Obtener todos los restaurantes existentes
    getAll(req: Request, res: Response) {
        Restaurant.find({}).then((response: RestaurantType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    //Obtener la información de un restaurant
    getRestaurants(req: Request, res: Response) {
        const { _id } = req.body;
        Restaurant.findOne({ _id: _id }).then((restaurant: RestaurantType | undefined) => {
            if (restaurant) {
                res.send(restaurant)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send(undefined);
            }
        }).catch(() => {
            res.status(HTTP_STATUS_CODES.SERVER_ERROR).send(undefined);
        });
    };

    //Obtener todos los restaurantes de una categoría 
    getRestaurantsByCategory(req: Request, res: Response) {
        const { category } = req.body;
        Restaurant.find({ category: category }).then((restaurantList: RestaurantType[] | undefined) => {
            if (restaurantList) {
                res.send(restaurantList)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Restaurantes no encontrados" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };

    //Crear un nuevo establecimiento
    createRestaurant(req: Request, res: Response) {
        const file = req.file as Express.MulterS3.File; // Aseguramos que req.file es de tipo MulterS3.File
        const image = file ? file.location : null; // URL de la imagen en S3, si se subió

        const { name, rating, description, category, location, price } = req.body;
        const newRestaurant = new Restaurant({ name, rating, description, category, location, image, price });
        newRestaurant.save().then((restaurant: RestaurantType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(restaurant);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Borrar un restaurant de la base
    deleteRestaurant(req: Request, res: Response) {
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
    updateRestaurant(req: Request, res: Response) {
        const { _id } = req.body;

        const updatedData = req.body.updatedData || {}; // Datos a actualizar
        const file = req.file as Express.MulterS3.File; // Aseguramos que req.file es de tipo MulterS3.File
        const imageUrl = file ? file.location : null; // URL de la imagen en S3, si se subió

        // Si hay una imagen nueva, la añadimos a los datos actualizados
        if (imageUrl) {
            updatedData.image = imageUrl;
        }

        Restaurant.findOneAndUpdate({ _id: _id }, updatedData, { new: true }).then((updatedRestaurant: RestaurantType | undefined) => {
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