import { Router } from "express";
import usersRoutes from './users';
import restaurantsRoutes from './restaurants';

const router = Router();

router.use('/user', usersRoutes);
router.use('/restaurant', restaurantsRoutes);

export default router;