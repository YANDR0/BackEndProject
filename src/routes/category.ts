import { Router } from "express";
import controllers from "../controllers/index";

const categoryController = controllers.categoryControllers;
const router = Router();

router.get('', categoryController.getAll); // Obtener todas las categorias
router.post('/', categoryController.createCategory); // Crear una nueva categoría
router.delete('/', categoryController.deleteCategory); // Eliminar una categoría existente
router.put('/', categoryController.updateCategory) // Actualizar una categoría existente
router.post('/id', categoryController.getCategories); // Obtener categorías por su ID
router.post('/type', categoryController.getCategoriesByType); // Obtener categorías por tipo

export default router;