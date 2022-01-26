const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ResourceA = require('../lib/models/Resource-a.js');

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

  it('sends a get request to resource-a and recieves an array of objects in the correct shape', async () => {
    ResourceA.insert(mockResourceA);
    
    const response = await request(app).get('/api/v1/resource-a/');

    const actual = response.body;

    const expected = [{
      ...mockResourceA,
      id: expect.any(String),
    }]

    expect(actual).toEqual(expected);
  });

});