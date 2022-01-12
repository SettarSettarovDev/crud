import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../redux/usersSlice';
import profilesSlice from '../redux/profilesSlice';
import authSlice from '../redux/authSlice';

it('empty', () => {});

export const users = [
  {
    userId: 1,
    userName: 'test',
    userEmail: 'test@test.test',
    userPassword: 'somePassword',
    userRole: 'ADMIN',
    createdAt: '2022-01-10T10:31:12.523Z',
    updatedAt: '2022-01-10T10:31:12.523Z',
  },
  {
    userId: 2,
    userName: 'qwe',
    userEmail: 'qwe@qwe.qwe',
    userPassword: 'somePassword',
    userRole: 'USER',
    createdAt: '2022-01-01T23:20:29.354Z',
    updatedAt: '2022-01-02T17:01:26.195Z',
  },
];

export const profiles = [
  {
    profileId: 1,
    profileName: 'first',
    profileGender: 'Male',
    profileBirthday: '2001-01-28',
    profileCity: 'firstCity',
    profileForUser: 1,
    createdAt: '2022-01-01T23:20:46.035Z',
    updatedAt: '2022-01-01T23:20:46.035Z',
    usersdbUserId: null,
  },
  {
    profileId: 2,
    profileName: 'second',
    profileGender: 'Female',
    profileBirthday: '2005-05-15',
    profileCity: 'secondCity',
    profileForUser: 1,
    createdAt: '2022-01-01T23:20:48.758Z',
    updatedAt: '2022-01-02T16:52:06.676Z',
    usersdbUserId: null,
  },
];

export const newProfile = {
  profileId: 3,
  profileName: 'third',
  profileGender: 'Male',
  profileBirthday: '2022-01-01',
  profileCity: 'thirdCity',
  profileForUser: 1,
  updatedAt: '2022-01-12T10:36:38.525Z',
  createdAt: '2022-01-12T10:36:38.525Z',
  usersdbUserId: null,
};

export const editedProfile = {
  profileId: 1,
  profileName: 'firstzzz',
  profileGender: 'Male',
  profileBirthday: '2022-01-01',
  profileCity: 'firstCityzzz',
  profileForUser: 1,
  createdAt: '2022-01-12T10:03:33.686Z',
  updatedAt: '2022-01-12T11:05:21.591Z',
  usersdbUserId: null,
};

export const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwidXNlclJvbGUiOiJBRE1JTiIsInVzZXJOYW1lIjoidGVzdCIsImlhdCI6MTY0MTgyMzA1MywiZXhwIjoxNjQxOTA5NDUzfQ.okYEku8MvyFKjqDGQnEOgc0D42VENIXu4VRT-FUfqHo';

export const handlers = [
  rest.post('http://localhost:5000/api/users/registration', (req, res, ctx) => {
    const isUserExist = users.find(user => user.userName === req.body.userName);

    if (isUserExist) {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'User with this email alredy exist',
        }),
        ctx.delay(150)
      );
    }

    return res(ctx.status(200), ctx.json(jwt), ctx.delay(150));
  }),

  rest.post('http://localhost:5000/api/users/login', (req, res, ctx) => {
    const user = users.find(user => user.userEmail === req.body.userEmail);

    if (!user) {
      return res(
        ctx.status(500),
        ctx.json({
          message: 'User not found',
        }),
        ctx.delay(150)
      );
    }

    const isUserPassword = user.userPassword === req.body.userPassword;

    if (!isUserPassword) {
      return res(
        ctx.status(500),
        ctx.json({
          message: 'Incorrect password',
        }),
        ctx.delay(150)
      );
    }

    return res(ctx.status(200), ctx.json(jwt), ctx.delay(150));
  }),
  rest.get('http://localhost:5000/api/users/auth', (req, res, ctx) => {
    return res(ctx.json(jwt), ctx.delay(150));
  }),
  rest.get('http://localhost:5000/api/users', (req, res, ctx) => {
    return res(ctx.json(users), ctx.delay(150));
  }),
  rest.get('http://localhost:5000/api/profiles', (req, res, ctx) => {
    return res(ctx.json(profiles), ctx.delay(150));
  }),
  rest.post('http://localhost:5000/api/profiles', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(newProfile), ctx.delay(150));
  }),
  rest.put('http://localhost:5000/api/profiles/:profileId', (req, res, ctx) => {
    // console.log(req.body);
    return res(ctx.status(200), ctx.json(editedProfile), ctx.delay(150));
  }),
  rest.put(`http://localhost:5000/api/users/:userId`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: 1,
        userName: 'testyyy',
        userEmail: 'test@test.testzzz',
        userPassword: 'somePassword',
        userRole: 'ADMIN',
        createdAt: '2022-01-01T23:20:29.354Z',
        updatedAt: '2022-01-12T08:56:34.564Z',
      }),
      ctx.delay(150)
    );
  }),
  rest.delete(`http://localhost:5000/api/users/:userId`, (req, res, ctx) => {
    return res(ctx.json('1'), ctx.delay(150));
  }),
  rest.delete(
    `http://localhost:5000/api/profiles/:profileId`,
    (req, res, ctx) => {
      return res(ctx.json('1'), ctx.delay(150));
    }
  ),
  rest.delete(
    `http://localhost:5000/api/profiles/deleteprofiles/:userId`,
    (req, res, ctx) => {
      return res(ctx.json('1'), ctx.delay(150));
    }
  ),
];

function customRender(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        users: usersSlice,
        profiles: profilesSlice,
        auth: authSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender };
