import request from 'supertest';
import nock from 'nock';
import app from '../index'; // assuming the app is exported from app.ts
import revolutDataBanks from '../data/revolut-tx.json';


describe('revolutController', () => {

    const baseUrl = 'http://localhost:5000';

    afterEach(() => {
        nock.cleanAll();
    });

    it('return revolut data correct', async () => {
        nock(baseUrl)
            .get('/api/revolut')
            .reply(200, { result: [{ revolutDataBanks }]});

        const response = await request(app).get('/api/revolut');        

        expect(response.status).toBe(200);
        expect(response.body).toEqual(revolutDataBanks); 
    });
});