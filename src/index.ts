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
    server = app.listen(port, () => {
        console.log(`App is running in port ${port}`)
    });
}).catch(err => {
    console.log("Error");
});

const io = new Server(server);

io.on('connection', (socket) => {

    socket.on('joinConnection', (room) => {
        socket.join(room);
    })

    socket.on('sendMessage', (data) => {
        socket.to(data.room).emit('getMessage', data.msg);
    })

})