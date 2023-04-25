import request from 'supertest';
import nock from 'nock';
import app from '../index'; // assuming the app is exported from app.ts
import revolutDataBanks from '../data/revolut-tx.json';

describe('revolutController', () => {
  it('return correct revolut data', async () => {
    // mock the API response using Nock
    nock('http://localhost:5000/api/revolut')
        .get('/revolut')
        .reply(200, revolutDataBanks);

        const res = await request(app).get('/api/revolut');

        expect(res.status).toEqual(200);
        expect(res.body).toEqual(revolutDataBanks);
    });
});