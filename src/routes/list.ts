import { Router } from "express";
import controllers from "../controllers/index";

const listController = controllers.listControllers;
const router = Router();

router.get('', listController.getAll); // Obtener todas las listas
router.post('', listController.createListElement); // Crear un elemento en la lista
router.delete('', listController.deleteListElement); // Eliminar un elemento de la lista
router.put('', listController.updateListElement); // Actualizar un elemento existente en la lista
router.post('/user', listController.getUserList); // Obtener la lista de restaurantes de un usuario
router.post('/restaurant', listController.getRestaurantList); // Obtener la información de listas de un restaurante

export default router;