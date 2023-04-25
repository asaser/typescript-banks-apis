import request from 'supertest';
import nock from 'nock';
import app from '../index'; // assuming the app is exported from app.ts
import revolutDataBanks from '../data/revolut-tx.json';

describe('revolutController', () => {

    const baseUrl = 'http://localhost:5000';
    const revolutBaseUrl = '/api/revolut';

    afterEach(() => {
        nock.cleanAll();
    });

    it('return revolut data correct', async () => {
        nock(baseUrl)
            .get(revolutBaseUrl)
            .reply(200, revolutDataBanks);

        const response = await request(app).get('/api/revolut');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(revolutDataBanks);
    });

    // To-Do write fake data to check
    // it('return revolut data not found', async () => {
    //     nock(baseUrl)
    //         .get(revolutBaseUrl)
    //         .reply(404, { message: 'Revolut data not found' });

    //     const response = await request(app).get('/api/revolut');

    //     expect(response.status).toBe(404);
    //     expect(response.body).toEqual({ 
    //         message: 'Revolut data not found' 
    //     });
    // })
});