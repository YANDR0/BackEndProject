import { Request, Response } from "express";
import ListElement from "../models/list";
import { UserList as ListType } from "../types/list"
import { HTTP_STATUS_CODES } from "../types/http-status-codes";


class ListControllers {

    //Obtener la información de todas las listas
    getAll(req: Request, res: Response){
        ListElement.find({}).then((response: ListType[]) => {
            res.send(response);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Obtener la lista de restaurantes de un usuario
    getUserList(req: Request, res: Response){
        const { userId } = req.body;
        ListElement.find({ userId: userId }).then((list: ListType[] | undefined) => {
            if(list) {
                res.send(list)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Elementos no encontrados" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };

    //Obtener la información de listas de un restaurante
    getRestaurantList(req: Request, res: Response){
        const { restaurantId } = req.body;
        ListElement.find({ restaurantId: restaurantId }).then((list: ListType[] | undefined) => {
            if(list) {
                res.send(list)
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Elementos no encontrados" });
            }
        }).catch(HTTP_STATUS_CODES.SERVER_ERROR);
    };

    //Crear un elemento en base a un usuario y un restaurant existente
    createListElement(req: Request, res: Response){
        const { userId, restaurantId, category, score } = req.body;
        const newReview = new ListElement({ userId, restaurantId, category, score});
        newReview.save().then((listElement: ListType) => {
            res.status(HTTP_STATUS_CODES.CREATED).send(listElement);
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Borra el elemento de la lista de un usuario
    deleteListElement(req: Request, res: Response){
        const { _id } = req.body;
        ListElement.findOneAndDelete({ _id: _id }).then((deletedElement: ListType | null) => {
            if (deletedElement) {
                res.send({ message: "Entrada eliminada correctamente" });
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Elemento de la lista no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

    //Actualiza el dato de un elemento existente
    updateListElement(req: Request, res: Response){
        const { _id, updatedData } = req.body;  
        ListElement.findOneAndUpdate({ _id: _id }, updatedData, { new: true }).then((updatedList: ListType | undefined) => {
            if (updatedList) {
                res.send(updatedList);
            } else {
                res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Elemento de la lista no encontrado" });
            }
        }).catch(() => {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        });
    };

}

const listControllers = new ListControllers();
export default listControllers;