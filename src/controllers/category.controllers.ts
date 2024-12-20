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
    };

    //Obtener una o más categorías a partir de su id
    getCategories(req: Request, res: Response){
        const { idList } = req.body;   //Luego reviso si puedo poner ids yo o los tengo que robar
        Category.find({ _id: { $in: idList }}).then((categoryList: CategoryType[] | undefined) => {
            if(categoryList) {
                res.send(categoryList)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Categorias no encontradas" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };

    //Obtener todas las categorías del mismo tipo
    getCategoriesByType(req: Request, res: Response){
        const { type } = req.body;
        Category.find({ type: type }).then((categoryList: CategoryType[] | undefined) => {
            if(categoryList) {
                res.send(categoryList)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Categorias no encontradas" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };
    
    //Crear una nueva categoría
    createCategory(req: Request, res: Response){
        const { category, type } = req.body;
        const newCategory = new Category({ category, type });
        newCategory.save().then((category: CategoryType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(category);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    //Borrar una categoría existente
    deleteCategory(req: Request, res: Response){
        const { _id } = req.body;
        Category.findOneAndDelete({ _id: _id }).then((deletedCategory: CategoryType | null) => {
            if (deletedCategory) {
                res.send({ message: "Categoria eliminada correctamente" });
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Categoria no encontrada" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }

    //Actualizar datos de una categoría
    updateCategory(req: Request, res: Response){
        const { _id, updatedData } = req.body;  // Obtener email del usuario a actualizar
        Category.findOneAndUpdate({ _id: _id }, updatedData, { new: true }).then((updatedCategory: CategoryType | undefined) => {
            if (updatedCategory) {
                res.send(updatedCategory);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Categoria no encontrada" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    }
    
}

const categoryControllers = new CategoryControllers();
export default categoryControllers;