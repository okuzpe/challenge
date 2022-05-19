import { app, server } from '../../index';
import supertest from 'supertest';
import { IUser } from '../../utils/interfaces/user';
import { CONFLICT, INVALID_FORMAT } from '../../utils/error-codes';
import { db } from '../../db';
import User from '../../db/user';
import mongoose from 'mongoose';

const api = supertest(app);

//MOCKS
const _id = new mongoose.Types.ObjectId();
const bodyUser: IUser = {
  name: 'Fintonic',
  email: 'fintonic@fintonic.com',
  country: 'Spain',
  notify: true,
  lang: 'ES',
};
const bodyUserNotify = { id: _id, notify: true };
const badBodyUser = { ...bodyUser, notify: '💥' };
const badBodyUserNotify = { id: _id, notify: '💥' };
const userCreated: IUser = { ...bodyUser, _id: _id };
const userUpdated: IUser = { ...bodyUser, name: 'Fintonic Updated' };

beforeAll(async () => {
  //this db should be only a Testing DB
  await db();
});

afterEach(() => {
  server.close();
  jest.clearAllMocks();
});

describe('POST  /user', () => {
  it('With bad body', async () => {
    const res = await api.post('/user').send(badBodyUser);

    expect(res.status).toEqual(500);
    expect(res.body.error).toBe(INVALID_FORMAT);
  });

  it('Already exists user email', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(bodyUser);
    const res = await api.post('/user').send(bodyUser);

    expect(res.status).toEqual(409);
    expect(res.body.message).toBe(CONFLICT);
  });

  it('Success created user', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);

    jest.spyOn(User.prototype, 'save').mockResolvedValue(userCreated);
    const res = await api.post('/user').send(bodyUser);
    expect(res.status).toEqual(201);
    expect(res.body.data.email).toStrictEqual(userCreated.email);
  });

  it('Internal server error', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(User.prototype, 'save').mockImplementation(() => {
      throw new Error('💥');
    });

    const res = await api.post('/user').send(bodyUser);

    expect(res.status).toEqual(500);
    expect(res.body.error).toBe('💥');
  });
});

describe('GET  /users', () => {
  it('Success get all users', async () => {
    jest.spyOn(User, 'find').mockResolvedValue([userCreated]);
    const res = await api.get('/users');
    expect(res.status).toEqual(200);
    expect(res.body.data.length).toBe(1);
  });

  it('Internal server error', async () => {
    jest.spyOn(User, 'find').mockImplementation(() => {
      throw new Error('💥');
    });

    const res = await api.get('/users').send(bodyUser);
    expect(res.status).toEqual(500);
    expect(res.body.error).toBe('💥');
  });
});

describe('GET By Id /user/:id', () => {
  it('Success get by id', async () => {
    jest.spyOn(User, 'findById').mockResolvedValue(userCreated);
    const res = await api.get(`/user/${_id}`);
    expect(res.status).toEqual(200);
    expect(res.body.data.email).toBe(userCreated.email);
  });

  it('Internal server error', async () => {
    jest.spyOn(User, 'findById').mockImplementation(() => {
      throw new Error('💥');
    });

    const res = await api.get(`/user/${_id}`);
    expect(res.status).toEqual(500);
    expect(res.body.error).toBe('💥');
  });
});

describe('UPDATE  /user/:id', () => {
  it('With bad body', async () => {
    const res = await api.put(`/user/${_id}`).send(badBodyUser);
    expect(res.status).toEqual(500);
    expect(res.body.error).toBe(INVALID_FORMAT);
  });

  it('Success Updated', async () => {
    jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(userUpdated);
    const res = await api.put(`/user/${_id}`).send(userUpdated);
    expect(res.status).toEqual(200);
    expect(res.body.data).toStrictEqual(userUpdated);
  });

  it('Internal server error', async () => {
    jest.spyOn(User, 'findOneAndUpdate').mockImplementation(() => {
      throw new Error('💥');
    });

    const res = await api.put(`/user/${_id}`).send(userUpdated);

    expect(res.status).toEqual(500);
    expect(res.body.error).toBe('💥');
  });
});

describe('PATCH  /user/:id', () => {
  it('With bad body', async () => {
    const res = await api.patch(`/user/${_id}`).send(badBodyUserNotify);
    expect(res.status).toEqual(500);
    expect(res.body.error).toBe(INVALID_FORMAT);
  });

  it('Success update notify user', async () => {
    jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(userUpdated);
    const res = await api.patch(`/user/${_id}`).send(bodyUserNotify);
    expect(res.status).toEqual(200);
    expect(res.body.data).toStrictEqual(userUpdated);
  });

  it('Internal server error', async () => {
    jest.spyOn(User, 'findOneAndUpdate').mockImplementation(() => {
      throw new Error('💥');
    });

    const res = await api.patch(`/user/${_id}`).send(bodyUserNotify);

    expect(res.status).toEqual(500);
    expect(res.body.error).toBe('💥');
  });
});
