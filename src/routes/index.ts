import { Router } from "express";
import usersRoutes from './users';
import restaurantsRoutes from './restaurants';
import sessionRoutes from './session';

const router = Router();

router.use('/user', usersRoutes);
router.use('/restaurant', restaurantsRoutes);
router.use('', sessionRoutes);

export default router;