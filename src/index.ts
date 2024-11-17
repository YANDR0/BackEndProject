import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
config();
import routes from './routes';
import { Server } from 'socket.io';
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from "./../swagger.config.json";
import cors from 'cors';
import { startSocket } from './controllers/socket.controller';


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

let server;
connect(dbUrl as string).then(res => {
    console.log('Ya se conectó la base');
    
    //Conexión al puerto
    server = app.listen(port, () => {
        console.log(`App is running in port ${port}`)
    });

    //Obtención del socket
    const io = new Server(server, { cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }});
    startSocket(io);

}).catch(err => {
    console.log("Error");
});




