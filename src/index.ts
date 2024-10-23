import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
config();
import routes from './routes';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from "./../swagger.config.json";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;
console.log('Mongo URL: ', dbUrl);

app.use(cors());

// Middleware para aceptar JSON
app.use(express.json());
app.use(routes);

const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/swagger', serve, setup(swaggerDocs))

connect(dbUrl as string).then(res => {
    console.log('Ya se conectó la base');
    app.listen(port, () => {
        console.log(`App is running in port ${port}`)
    });
}).catch(err => {
    console.log("Error");
});