const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

mockResourceC = {
  warning: 'test-resource-c-warning',
  isResolved: false,
}

describe('backend-05-hand-of-resources resource-c routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('sends a post request to resource-c and recieves an object in the correct shape', async () => {
    const insertResponse = await request(app).post('/api/v1/resource-c/').send(mockResourceC);
    const actual = insertResponse.body;
    
    expect(actual).toEqual(mockResourceC);
  });
});