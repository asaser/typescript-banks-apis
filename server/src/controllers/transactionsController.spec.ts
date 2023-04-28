import request from 'supertest';
import nock from 'nock';
import app from '../index';
import { mapSterlingTransactions, mapMonzoTransactions, mapRevolutTransaction } from './transactionsController';

describe('manage Transactions', () => {

    const baseUrl = 'http://localhost:5000';

    afterEach(() => {
        nock.cleanAll();
    });

    describe('getTransactions', () => {
        it('return all data from banks in one transaction', async () => {
            nock(baseUrl)
            .get('/transactions')
            .reply(200, {
                transactions: [
                ...mapSterlingTransactions,
                ...mapMonzoTransactions,
                ...mapRevolutTransaction,
                ],
            });
        
            const response = await request(app).get('/transactions');
        
            expect(response.status).toBe(200);
            expect(response.body.transactions).toHaveLength(
            mapSterlingTransactions.length +
                mapMonzoTransactions.length +
                mapRevolutTransaction.length
            );
        });
    });

    describe('getBanksTransactions', () => {
        it('return all data from sterling transactions', async () => {
            nock(baseUrl)
            .get('/api/sterling')
            .reply(200, { transactions: mapSterlingTransactions });
    
            const response = await request(app).get('/transactions/bank?source=sterling');
    
            expect(response.status).toBe(200);
            expect(response.body.transactions).toEqual(mapSterlingTransactions);
        });
    
        it('return all data from monzo transactions', async () => {
            nock(baseUrl)
            .get('/api/monzo')
            .reply(200, { transactions: mapMonzoTransactions });
    
            const response = await request(app).get('/transactions/bank?source=monzo');
    
            expect(response.status).toBe(200);
            expect(response.body.transactions).toEqual(mapMonzoTransactions);
        });
    
        it('return all data from revolut transactions', async () => {
            nock(baseUrl)
            .get('/api/revolut')
            .reply(200, { transactions: mapRevolutTransaction });
    
            const response = await request(app).get('/transactions/bank?source=revolut');
    
            expect(response.status).toBe(200);
            expect(response.body.transactions).toEqual(mapRevolutTransaction);
        });
    
        it('return server error for not valid source data', async () => {
    
            const response = await request(app).get('/transactions/bank?source=invalid');
    
            expect(response.status).toBe(500);
        });
    });
});