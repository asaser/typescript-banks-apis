import request from 'supertest';
import nock from 'nock';
import app from '../index'; // assuming the app is exported from app.ts
import sterlingDataBanks from '../data/sterling-tx.json';


describe('sterlingController', () => {

    const baseUrl = 'http://localhost:5000';

    afterEach(() => {
        nock.cleanAll();
    });

    it('return sterling data correct', async () => {
        nock(baseUrl)
            .get('/api/sterling')
            .reply(200, { result: [{ sterlingDataBanks }]});

        const response = await request(app).get('/api/sterling');        

        expect(response.status).toBe(200);
        expect(response.body).toEqual(sterlingDataBanks); 
    });
});