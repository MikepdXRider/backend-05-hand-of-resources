const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

mockResourceA = {
    name: 'test-resource-a-name',
    description: 'test-resource-a-description',
    quantity: 1000000,
}

describe('backend-05-hand-of-resources resource-a routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('sends a post request to resource-a and recieves an object in the correct shape', async () => {
    const response = await request(app).post('/api/v1/resource-a/').send(mockResourceA);

    const actual = response.body;

    const expected = {
      ...mockResourceA,
      id: expect.any(String),
    }

    expect(actual).toEqual(expected);
  });

});