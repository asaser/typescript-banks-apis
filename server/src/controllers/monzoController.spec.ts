import request from 'supertest';
import nock from 'nock';
import app from '../index'; // assuming the app is exported from app.ts
import monzoDataBanks from '../data/monzo-tx.json';

describe('monzoController', () => {

    const baseUrl = 'http://localhost:5000';

    afterEach(() => {
        nock.cleanAll();
    });

    it('return monzo data correct', async () => {
        nock(baseUrl)
            .get('/api/monzo')
            .reply(200, { result: [{ monzoDataBanks }]});

        const response = await request(app).get('/api/monzo');        

        expect(response.status).toBe(200);
        expect(response.body).toEqual(monzoDataBanks); 
    });
});

