const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ResourceA = require('../lib/models/Resource-a.js');
const resourceA = require('../lib/controllers/resource-a.js');

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
    await ResourceA.insert(mockResourceA);
    
    const response = await request(app).get('/api/v1/resource-a/');

    const actual = response.body;

    const expected = [{
      ...mockResourceA,
      id: expect.any(String),
    }]

    expect(actual).toEqual(expected);
  });

  it('sends a get by id request to resource-a and recieves an object in the correct shape', async () => {
    const { id } = await ResourceA.insert(mockResourceA);

    const response = await request(app).get(`/api/v1/resource-a/${id}`);

    const actual = response.body;

    const expected = {
      ...mockResourceA,
      id,
    }

    expect(actual).toEqual(expected);
  });

  it('sends a patch by id request to resource-a and recieves an object in the correct shape', async () => {
    const { id } = await ResourceA.insert(mockResourceA);

    const patchResponse = await request(app).patch(`/api/v1/resource-a/${id}`).send({name: 'patched-test-resource-a-name'});

    const actual = patchResponse.body;

    const expected = await ResourceA.getById(id);

    expect(actual).toEqual(expected);
  });

  it('sends a delete by id request to delete an object, get by id throws error', async () => {
    const expected = await ResourceA.insert(mockResourceA);
    const { id } = expected;

    const deleteResponse = await request(app).delete(`/api/v1/resource-a/${id}`);
    const actual = deleteResponse.body;
    
    expect(expected).toEqual(actual);

    expect(async () => await ResourceA.getById(id)).rejects.toThrow();
  });

});