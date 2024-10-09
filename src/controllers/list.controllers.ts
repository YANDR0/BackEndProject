import { Request, Response } from "express";
import ListElemente from "../models/list";
import { UserList as ListType } from "../types/list"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";


class ListControllers {

    //Obtener la información de todas las listas
    getAll(req: Request, res: Response){
        res.send('list')
    };

    //Obtener la lista de restaurantes de un usuario
    getUserList(req: Request, res: Response){};

    //Obtener la información de listas de un restaurante
    getRestaurantList(req: Request, res: Response){};

    //Crear un elemento en base a un usuario y un restaurant existente
    createListElement(req: Request, res: Response){};

    //Borra el elemento de la lista de un usuario
    deleteListElement(req: Request, res: Response){};

    //Actualiza el dato de un elemento existente
    updateListElement(req: Request, res: Response){};

}

const listControllers = new ListControllers();
export default listControllers;