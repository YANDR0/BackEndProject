// upload-s3.ts
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

// Filtrado de archivos para permitir solo imágenes (jpg, jpeg, png, gif)
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const isValid = allowedMimeTypes.includes(file.mimetype);
    cb(null, isValid);
};

const accesKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_SECRET_KEY;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET_NAME;

const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accesKey || '',
        secretAccessKey: secretKey || ''
    }
});

if (!bucket) {
    throw new Error('El nombre del bucket S3 no está definido. Asegúrate de configurar la variable de entorno S3_BUCKET_NAME.');
}

// Configuración de almacenamiento en S3 para guardar en la carpeta 'images/'
const s3Storage = multerS3({
    s3: s3Client,
    bucket: bucket,
    metadata: (req, file, cb) => {
        cb(null, { ...file });
    },
    acl: 'public-read',
    key: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const ext = file.originalname.split('.').pop();
        cb(null, `images/${timestamp}.${ext}`); // Guardar en la carpeta 'images/'
    }
});

const uploadS3 = multer({ storage: s3Storage, fileFilter });

export default uploadS3;
