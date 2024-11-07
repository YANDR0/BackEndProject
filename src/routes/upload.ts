import { Router } from "express";
import controllers from "../controllers/index";
import { authenticateToken } from "../middlewares/authToken";
import uploadS3 from '../middlewares/upload-s3';

const uploadController = controllers.uploadController;
const router = Router()

router.post('/uploadS3', uploadS3.single('file'), uploadController.saveSingleImage);
router.post('/uploadsS3', uploadS3.array('files'), uploadController.saveMultipleImages);

export default router;