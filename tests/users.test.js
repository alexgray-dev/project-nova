const request = require('supertest');
const app = require('../src/app');
const user = require('../src/models/user');

beforeEach(() => {
  user.reset();
});

describe('Users API', () => {
  test('GET /api/users returns an empty array initially', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/users creates a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Ada Lovelace', email: 'ada@example.com', age: 36 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      age: 36,
    });
  });

  test('POST /api/users rejects missing fields', async () => {
    const res = await request(app).post('/api/users').send({ name: 'No Email' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /api/users rejects duplicate email', async () => {
    await request(app)
      .post('/api/users')
      .send({ name: 'First', email: 'dup@example.com' });
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Second', email: 'dup@example.com' });
    expect(res.status).toBe(400);
  });

  test('GET /api/users/:id returns the user', async () => {
    const created = await request(app)
      .post('/api/users')
      .send({ name: 'Grace Hopper', email: 'grace@example.com' });
    const res = await request(app).get(`/api/users/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('grace@example.com');
  });

  test('GET /api/users/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
  });

  test('PUT /api/users/:id updates a user', async () => {
    const created = await request(app)
      .post('/api/users')
      .send({ name: 'Alan Turing', email: 'alan@example.com' });
    const res = await request(app)
      .put(`/api/users/${created.body.id}`)
      .send({ name: 'Alan M. Turing' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Alan M. Turing');
    expect(res.body.email).toBe('alan@example.com');
  });

  test('PUT /api/users/:id returns 404 for unknown id', async () => {
    const res = await request(app).put('/api/users/999').send({ name: 'Ghost' });
    expect(res.status).toBe(404);
  });

  test('DELETE /api/users/:id removes a user', async () => {
    const created = await request(app)
      .post('/api/users')
      .send({ name: 'Edsger Dijkstra', email: 'edsger@example.com' });
    const del = await request(app).delete(`/api/users/${created.body.id}`);
    expect(del.status).toBe(204);
    const res = await request(app).get(`/api/users/${created.body.id}`);
    expect(res.status).toBe(404);
  });
});
