import request from 'supertest';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

describe('Tests in /session', () => {
  // Crear usuario con correo ya utilizado
  it('POST /session/register - Fails for mail already in use', async () => {
    const response = await request('http://localhost:3000')
      .post('/session/register')
      .send({
        "name": "Nombre",
        "email": "yael.alexrb@gmail.com",
        "password": "qwertyuiop"
      });
    expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
  });

  // Inicio de sesión fallido debido a ususario inexistente
  it('POST /session/login - Fail with inexistent user', async () => {
    const response = await request('http://localhost:3000')
      .post('/session/login')
      .send({
        "email": "a@a.com",
        "password": "qwertyuiop"
      });
    expect(response.status).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    //expect(response.body).toEqual({ message: "Usuario no encontrado"});
  });

  // Inicio de sesión exitoso con usuario existente
  it('POST /session/login - Success and start session', async () => {
    const response = await request('http://localhost:3000')
      .post('/session/login')
      .send({
        "email": "yael.alexrb@gmail.com",
        "password": "qwertyuiop"
      });
    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

});


describe('Tests in /restaurant', () => {
  // Obtener la lista de restaurantes
  it('GET /restaurant - Success without errors', async () => {
    const response = await request('http://localhost:3000')
      .get('/restaurant')
      .send({})
      
    expect(response.status).toBe(HTTP_STATUS_CODES.SUCCESS);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Pedir información de un restaurant sin su id
  it('POST /restaurant/info - Error for missing values', async () => {
    const info = await request('http://localhost:3000')
      .post('/session/login')
      .send({
        "email": "yael.alexrb@gmail.com",
        "password": "qwertyuiop"
    });
    const token = info.body.token;
    const response = await request('http://localhost:3000')
      .post('/restaurant/info')
      .set("authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
  });


  // Pedir información de un restaurant con id incorrecto
  it('POST /restaurant/info - Error for incorrect id', async () => {
    const info = await request('http://localhost:3000')
      .post('/session/login')
      .send({
        "email": "yael.alexrb@gmail.com",
        "password": "qwertyuiop"
    });
    const token = info.body.token;
    const response = await request('http://localhost:3000')
      .post('/restaurant/info')
      .set("authorization", `Bearer ${token}`)
      .send({ "_id": "1" });
    expect(response.status).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
  });


});


