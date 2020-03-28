const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/conn');

describe('Incidents', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', 'abc')
      .send({
        title: 'Caminhão quebrado',
        description: 'Caminhão parou na rua e ninguem consegue tirar.',
        value: 0
      });

    expect(response.body).toHaveProperty('id');
  });
});
