import { Router } from "express";
import ussuariosRoutes from './usuarios';

const router = Router();

router.use('/usuarios', ussuariosRoutes);

export default router;