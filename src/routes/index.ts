import { Router } from "express";
import usersRoutes from './users';
import restaurantsRoutes from './restaurants';
import sessionRoutes from './session';
import reviewsRoutes from './reviews';
import listRoutes from './list';
import categoryRoutes from './category';

const router = Router();

/**
 * @swagger
 * /:
 *  get:
 *   tags: [Home]
 *   description: Home endpoint
 *   responses: 
 *    200:
 *     description: Api successful yei
 */
router.get('', (req, res) => {
    res.send('Api works!')
})

router.use('/session', sessionRoutes);
router.use('/user', usersRoutes);
router.use('/restaurant', restaurantsRoutes);

router.use('/reviews', reviewsRoutes);  
router.use('/list', listRoutes);   
router.use('/category', categoryRoutes);

export default router;