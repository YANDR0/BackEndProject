import { Request, Response } from "express";
import Category from "../models/category";
import { Category as CategoryType } from "../types/categorys";
import { HTTP_STATUS_CODES } from "../types/http-status-codes";


class CategoryControllers {

    //Lista de categorías de restaurantes
    getAll(req: Request, res: Response) {
        Category.find({}).then((response: CategoryType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    //Obtener una o más categorías a partir de su id
    getCategories(req: Request, res: Response){}

    //Obtener todas las categorías del mismo tipo
    getCategoriesByType(req: Request, res: Response){}
    
    //Crear una nueva categoría
    createCategory(req: Request, res: Response){}

    //Borrar una categoría existente
    deleteCategory(req: Request, res: Response){}

    //Actualizar datos de una categoría
    updateCategory(req: Request, res: Response){}
    
}

const categoryControllers = new CategoryControllers();
export default categoryControllers;