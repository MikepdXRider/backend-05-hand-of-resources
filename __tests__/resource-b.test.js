const pool = require('../utils/pool');
const setup = require('../../data/setup');
const request = require('supertest');
const app = require('../app');

describe('backend-05-hand-of-resources resource-b routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});