import { Request, Response } from "express";

class UsuariosController {
    listAll(req: Request, res: Response){
        res.send('Lista de usuarios');
    }
}

const usuariosController = new UsuariosController();
export default usuariosController;