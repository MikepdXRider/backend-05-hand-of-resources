const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ResourceD = require('../lib/models/Resource-d.js');

const mockResourceD = {
  name: 'test-resource-d-name',
  description: 'test-resource-d-description',
  contractValue: 10000
}

describe('backend-05-hand-of-resources resource-e routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('sends a post request to resource-d and recieves an object in the correct shape', async () => {
    const postResponse = await request(app).post('/api/v1/resource-d/').send(mockResourceD);
    const actual = postResponse.body;

    const expected = {
      ...mockResourceD,
      id: expect.any(String)
    };

    expect(actual).toEqual(expected);
  });

  it('sends a get by all request to resource-d and recieves an array of objects in the correct shape', async () => {
    await ResourceD.insert(mockResourceD);

    const getAllResponse = await request(app).get('/api/v1/resource-d/');
    const actual = getAllResponse.body;

    const expected = [{
      ...mockResourceD,
      id: expect.any(String)
    }];

    expect(actual).toEqual(expected);
  });
});