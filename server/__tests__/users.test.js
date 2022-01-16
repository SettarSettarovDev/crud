const request = require('supertest');
const { app } = require('../index.js');
const sequelize = require('../db');
const models = require('../models/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await request(app).post('/api/users/registration').send({
    userName: 'qwe',
    userEmail: 'qwe@qwe.qwe',
    userPassword: 'qwe',
    userRole: 'ADMIN',
  });

  await request(app).post('/api/users/registration').send({
    userName: 'rty',
    userEmail: 'rty@rty.rty',
    userPassword: 'rty',
    userRole: 'USER',
  });
});

describe('User API', () => {
  const tokenAdmin =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6InF3ZUBxd2UucXdlIiwidXNlclJvbGUiOiJBRE1JTiIsInVzZXJOYW1lIjoicXdlIiwiaWF0IjoxNjQyMzQ3MDQ1LCJleHAiOjE2NDUwMjU0NDV9.j7_hD-jI2OCOiqJlxtdy0ExM-PgW5sWfPo3WexsC55I';
  const tokenUser =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6InJ0eUBydHkucnR5IiwidXNlclJvbGUiOiJVU0VSIiwidXNlck5hbWUiOiJydHkiLCJpYXQiOjE2NDIzNDcwOTcsImV4cCI6MTY0NTAyNTQ5N30.2ng4GPZM7tvUzNzzY7nMiZTLAbdUMU3UYpiJcAHVti8';

  it('should fetch all users [userRole: ADMIN]', async () => {
    const res = await request(app)
      .get('/api/users')
      .set({ Authorization: tokenAdmin });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
  });

  it('should show error 403 [userRole: USER]', async () => {
    const res = await request(app)
      .get('/api/users')
      .set({ Authorization: tokenUser });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message', 'No access');
  });

  it('should show error 401 [wrong token]', async () => {
    const res = await request(app)
      .get('/api/users')
      .set({ Authorization: 'wrong Mask' });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not autorized');
  });

  it('should show error 401', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Not autorized');
  });

  it('should update user', async () => {
    const res = await request(app)
      .put('/api/users/1')
      .set({ Authorization: tokenAdmin })
      .send({
        userName: 'rty',
        userEmail: 'qwe@qwe.qwe',
        userRole: 'ADMIN',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userName', 'rty');
  });

  it('should delete user', async () => {
    const res = await request(app)
      .delete('/api/users/2')
      .set({ Authorization: tokenAdmin });
    expect(res.statusCode).toEqual(200);
  });
});
