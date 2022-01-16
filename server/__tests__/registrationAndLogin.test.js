const request = require('supertest');
const { app } = require('../index.js');
const sequelize = require('../db');
const models = require('../models/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Registration and login', () => {
  const tokenAdmin =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6InF3ZUBxd2UucXdlIiwidXNlclJvbGUiOiJBRE1JTiIsInVzZXJOYW1lIjoicXdlIiwiaWF0IjoxNjQyMzQ3MDQ1LCJleHAiOjE2NDUwMjU0NDV9.j7_hD-jI2OCOiqJlxtdy0ExM-PgW5sWfPo3WexsC55I';

  it('Should register new user', async () => {
    const res = await request(app).post('/api/users/registration').send({
      userName: 'qwe',
      userEmail: 'qwe@qwe.qwe',
      userPassword: 'qwe',
      userRole: 'ADMIN',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(String));
  });

  it('Should show error when name, email or passsword are incorrect', async () => {
    const res = await request(app)
      .post('/api/users/registration')
      .send({ userName: '', userEmail: '', userPassword: '', userRole: '' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty(
      'message',
      'Incorrect name, email or passsword'
    );
  });

  it('Should show error when ser with this email alredy exist', async () => {
    const res = await request(app).post('/api/users/registration').send({
      userName: 'qwe',
      userEmail: 'qwe@qwe.qwe',
      userPassword: 'qwe',
      userRole: 'ADMIN',
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty(
      'message',
      'User with this email alredy exist'
    );
  });

  it('Should show error when user with entered email not found', async () => {
    const res = await request(app).post('/api/users/login').send({
      userEmail: 'rty@rty.rty',
      userPassword: 'rty',
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('Should show error when user entered wrong password', async () => {
    const res = await request(app).post('/api/users/login').send({
      userEmail: 'qwe@qwe.qwe',
      userPassword: 'rty',
    });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message', 'Incorrect password');
  });

  it('Should logged in user', async () => {
    const res = await request(app).post('/api/users/login').send({
      userEmail: 'qwe@qwe.qwe',
      userPassword: 'qwe',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(String));
  });

  it('should show error 401 when user try auth without token', async () => {
    const res = await request(app).get('/api/users/auth');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not autorized');
  });

  it('should authtorize with token', async () => {
    const res = await request(app)
      .get('/api/users/auth')
      .set({ Authorization: tokenAdmin });
    expect(res.statusCode).toEqual(200);
  });

  it('should show error 401 when user try auth with wrong token', async () => {
    const res = await request(app)
      .get('/api/users/auth')
      .set({ Authorization: 'wrong Mask' });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not autorized');
  });
});
