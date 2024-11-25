import request from 'supertest';
import { HTTP_STATUS_CODES } from '../types/http-status-codes';

describe('Tests in session api', () => {
  // Crear usuario con correo ya utilizado
  it('POST /session/register - Fails for mail already in use', async () => {
    const response = await request('http://localhost:3000')
      .post('/session/register')
      .send({
        "name": "Nombre",
        "email": "yael.alexrb@gmail.com",
        "password": "qwertyuiop"
      });
    expect(response.status).toBe(HTTP_STATUS_CODES.SERVER_ERROR);
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
    expect(response.body).toEqual({ message: "Usuario no encontrado"});
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

