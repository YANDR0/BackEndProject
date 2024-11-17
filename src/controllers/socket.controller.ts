import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';


export const startSocket = (io: Server) => {

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if(!token)
            return next(new Error('Token do not found'));
        try{
            jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {})
        } catch(err){
            return next(new Error('Token unauthorized'))
        }

        console.log("Uniendose", token)
        next();
    })

    io.on('connection', (socket) => {

        console.log("Conneción exitosa")

        /*
        socket.use(([event, ...args] , next) => {
            if(event != 'sendMessage') return next()

            const token =  args[0].token;
            console.log("Verificando token", token)
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
        })*/

        socket.on('joinConnection', (room: string) => {
            console.log("Uniendose a room", room);
            socket.join(room);
        })

        socket.on('sendMessage', (data: any) => {
            console.log("Mandando mensaje", data);
            socket.to(data.room).emit('getMessage', data.msg);
        })
    })

}
