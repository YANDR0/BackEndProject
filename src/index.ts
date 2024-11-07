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
import jwt from 'jsonwebtoken';

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

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if(!token)
        next(new Error('Token do not found'));

    //Lógica de jwt que no sé si funcione aquí (Como middleware auth token)
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
        if(err)
            next(new Error('Token unauthorized'))
    })

    next();
})

io.on('connection', (socket) => {

    socket.use(([event, ...args] , next) => {
        if(event != 'sendMessage')
            next()

        //Lo mismo de jwt, pero ahora para rol, también ver por donde paso el token que aquí solo viene el evento
        //Luego reviso que hay en args, según yo es info como event o data, tons xd
        next()

    })

    socket.on('joinConnection', (room) => {
        socket.join(room);
    })

    socket.on('sendMessage', (data) => {
        socket.to(data.room).emit('getMessage', data.msg);
    })

})