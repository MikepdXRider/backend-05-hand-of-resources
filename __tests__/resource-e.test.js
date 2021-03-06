const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const ResourceE = require('../lib/models/Resource-e.js');

const mockResourceE = {
  contactName: 'test-resource-e-contact-name',
  company: 'test-resource-e-company',
  prefContactMethod: 'email',
  email: 'test-resource-e-contact@email.com',
  phoneNum: null,
}

describe('backend-05-hand-of-resources resource-e routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('sends a post request to resource-a and recieves an object in the correct shape', async () => {
    const postResponse = await request(app).post('/api/v1/resource-e/').send(mockResourceE);
    const actual = postResponse.body;

    const expected = {
      ...mockResourceE,
      id: expect.any(String)
    };

    expect(actual).toEqual(expected);
  });

  it('sends a get all request to resource-a and recieves an array of objects in the correct shape', async () => {
    await ResourceE.insert(mockResourceE);

    const getAllResponse = await request(app).get('/api/v1/resource-e/')
    const actual = getAllResponse.body;
   
    const expected = [{
      ...mockResourceE,
      id: expect.any(String)
    }];

    expect(actual).toEqual(expected);
  });

  it('sends a get by id request to resource-a and recieves an object in the correct shape', async () => {
    const { id } = await ResourceE.insert(mockResourceE);

    const getByIdResponse = await request(app).get(`/api/v1/resource-e/${id}`);
    const actual = getByIdResponse.body;
   
    const expected = {
      ...mockResourceE,
      id
    };

    expect(actual).toEqual(expected);
  });

  it('sends a update by id request to resource-a and recieves an object in the correct shape', async () => {
    const { id } = await ResourceE.insert(mockResourceE);

    const updateResponse = await request(app).patch(`/api/v1/resource-e/${id}`).send({ phoneNum: '5033339999', prefContactMethod: 'phone'});
    const actual = updateResponse.body;
   
    const expected = {
      ...mockResourceE,
      id,
      phoneNum: '5033339999',
      prefContactMethod: 'phone'
    };

    expect(actual).toEqual(expected);
    expect(await ResourceE.getById(id)).toEqual(expected);
  });

  it('sends a delete request to resource-a, get by id throws error', async () => {
    const { id } = await ResourceE.insert(mockResourceE);

    const deleteResponse = await request(app).delete(`/api/v1/resource-e/${id}`);
    const actual = deleteResponse.body;
   
    const expected = {
      ...mockResourceE,
      id,
    };

    expect(actual).toEqual(expected);
    expect(async () => await Resource.getById(id)).rejects.toThrow();
  });
});