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
        return next(new Error('Token do not found'));

    try{
        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {})
    } catch(err){
        return next(new Error('Token unauthorized'))
    }
    
    next();
})

io.on('connection', (socket) => {

    socket.use(([event, ...args] , next) => {
        if(event != 'sendMessage') return next()

        const token =  args[0].token;
        try{
            jwt.verify(token, process.env.JWT_SECRET, (err:any, decoded: any) => {
                const userRole = decoded.role;
                console.log(userRole);
                if (userRole !== 0) return next(new Error('Invalid role'))
            });
        } catch {
            return next(new Error('Invalid token'))
        }
        next()
    })

    socket.on('joinConnection', (room) => {
        socket.join(room);
    })

    socket.on('sendMessage', (data) => {
        socket.to(data.room).emit('getMessage', data.msg);
    })

})