const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ResourceC = require('../lib/models/Resource-c.js');

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

    expected = {
      ...mockResourceC,
      id: expect.any(String),
      timeOfError: expect.any(String)
    };
    
    expect(actual).toEqual(expected);
  });

  it('sends a get request to resource-c and recieves an array of objects in the correct shape', async () => {
    await ResourceC.insert(mockResourceC);

    const getResponse = await request(app).get('/api/v1/resource-c/')
    const actual = getResponse.body;

    const expected = [{
      ...mockResourceC,
      id: expect.any(String),
      timeOfError: expect.any(String)
    }];
    
    expect(actual).toEqual(expected);
  });

  it('sends a get by id request to resource-c and recieves an object in the correct shape', async () => {
    const { id } = await ResourceC.insert(mockResourceC);

    const getByIdResponse = await request(app).get(`/api/v1/resource-c/${id}`);
    const actual = getByIdResponse.body;

    const expected = {
      ...mockResourceC,
      id,
      timeOfError: expect.any(String)
    };
    
    expect(actual).toEqual(expected);
  });

  it('sends a update by id request to resource-c and recieves an object in the correct shape', async () => {
    const { id } = await ResourceC.insert(mockResourceC);

    const updateByIdResponse = await request(app).patch(`/api/v1/resource-c/${id}`).send({isResolved: true});
    const actual = updateByIdResponse.body;

    const expected = {
      ...mockResourceC,
      id,
      isResolved: true,
      timeOfError: expect.any(String)
    };
    
    expect(actual).toEqual(expected);
  });

  it('sends a delete by id request to resource-c, get by id request throws error', async () => {
    const insertResponse = await ResourceC.insert(mockResourceC);
    const { id } = insertResponse;

    const deleteByIdResponse = await request(app).delete(`/api/v1/resource-c/${id}`);
    const actual = deleteByIdResponse.body;

    const expected = {
      ...insertResponse,
      timeOfError: expect.any(String)
    }

    expect(actual).toEqual(expected);
    expect(async () => await ResourceC.getById(id)).rejects.toThrow();
  });
});