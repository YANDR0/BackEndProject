import { Router } from "express";
import usersRoutes from './users';
import restaurantsRoutes from './restaurants';
import sessionRoutes from './session';
import reviewsRoutes from './reviews';
import listRoutes from './list';
import categoryRoutes from './category';


const router = Router();

router.use('', sessionRoutes);
router.use('/user', usersRoutes);
router.use('/restaurant', restaurantsRoutes);

//Temporales
router.use('/reviews', reviewsRoutes);  //Este podría ir dentro de users o restaurants
router.use('/list', listRoutes);    //Este podría ir dentro de users o algo así
router.use('/category', categoryRoutes);    //Este podría ir dentro de restaurants o algo así

export default router;