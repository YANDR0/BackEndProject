// controllers/upload-s3.controller.ts
import { Request, Response } from 'express';
import Image from '../models/image';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

class UploadS3Controller {
    // Guardar la URL de una sola imagen
    saveSingleImage(req: Request, res: Response) {
        const file = req.file as Express.MulterS3.File;

        if (!file) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'No se ha subido ninguna imagen' });
        }

        const newImage = new Image({ url: file.location });

        newImage.save()
            .then(() => res.status(HTTP_STATUS_CODES.CREATED).send({ message: 'Imagen guardada en la base de datos', url: file.location }))
            .catch(() => res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR));
    }

    // Guardar las URLs de múltiples imágenes
    saveMultipleImages(req: Request, res: Response) {
        const files = req.files as Express.MulterS3.File[];

        if (!files || files.length === 0) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'No se han subido imágenes' });
        }

        const images = files.map(file => ({ url: file.location }));

        Image.insertMany(images)
            .then(() => res.status(HTTP_STATUS_CODES.CREATED).send({ message: 'Imágenes guardadas en la base de datos', urls: images.map(img => img.url) }))
            .catch(() => res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR));
    }
}

const uploadS3Controller = new UploadS3Controller();
export default uploadS3Controller;
