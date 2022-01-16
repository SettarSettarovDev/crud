const request = require('supertest');
const { app } = require('../index.js');
const sequelize = require('../db');
const models = require('../models/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Profiles API', () => {
  const tokenAdmin =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6InF3ZUBxd2UucXdlIiwidXNlclJvbGUiOiJBRE1JTiIsInVzZXJOYW1lIjoicXdlIiwiaWF0IjoxNjQyMzQ3MDQ1LCJleHAiOjE2NDUwMjU0NDV9.j7_hD-jI2OCOiqJlxtdy0ExM-PgW5sWfPo3WexsC55I';
  it('Should create new profile', async () => {
    const res = await request(app).post('/api/profiles').send({
      profileName: 'asd',
      profileGender: 'Male',
      profileBirthday: '2000-01-01',
      profileCity: 'Asd',
      profileForUser: 1,
    });
    expect(res.statusCode).toEqual(200);
  });

  it('should update profile', async () => {
    const res = await request(app)
      .put('/api/profiles/1')
      .set({ Authorization: tokenAdmin })
      .send({
        profileName: 'fgh',
        profileGender: 'Male',
        profileBirthday: '2000-01-01',
        profileCity: 'Asd',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('profileName', 'fgh');
  });

  it('should delete profile', async () => {
    const res = await request(app)
      .delete('/api/profiles/1')
      .set({ Authorization: tokenAdmin });

    expect(res.statusCode).toEqual(200);
  });

  it('should delete all profile for choosen user', async () => {
    const res = await request(app)
      .delete('/api/profiles/deleteprofiles/1')
      .set({ Authorization: tokenAdmin });

    expect(res.statusCode).toEqual(200);
  });

  it('should fetch all profiles', async () => {
    const res = await request(app)
      .get('/api/profiles')
      .set({ Authorization: tokenAdmin });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});
