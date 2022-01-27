const pool = require('../lib/utils//pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ResourceB = require('../lib/models/Resource-b.js');

mockResourceB = {
  name: 'test-resource-b-name',
  description: 'test-resource-b-description',
  inStock: true,
}

describe('backend-05-hand-of-resources resource-b routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('sends a post request to resource-b and recieves an object in the correct shape', async () => {
    const response = await request(app).post('/api/v1/resource-b/').send(mockResourceB);

    const actual = response.body;

    const expected = {
      ...mockResourceB,
      id: expect.any(String)
    };

    expect(actual).toEqual(expected);
  });

  it('sends a get request to resource-b and recieves an array of objects in the correct shape', async () => {
    ResourceB.insert(mockResourceB);
    
    const response = await request(app).get('/api/v1/resource-b/');

    const actual = response.body;

    const expected = [{
      ...mockResourceB,
      id: expect.any(String)
    }];

    expect(actual).toEqual(expected);
  });
});