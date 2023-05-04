const router = require('../controllers/carController')
const request = require('supertest')
const express = require('express');
const app = express();

app.use(router);

describe('Test carController', () => {
    it('should add a new car to the database', async () => {
        const res = await request(app)
            .post('/new')
            .query({ Make: 'Honda', Model: 'Civic', Year: '2020' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('New car has been added, make: Honda, model: Civic and year: 2020');
    });

    it('should find a single car in the database', async () => {
        const res = await request(app)
            .get('/show')
            .query({ Make: 'Honda', Model: 'Civic', Year: '2020' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('The car has been found, make: Honda, model: Civic and year: 2020');
    });
});


describe('Test carController', () => {
    it('should find all cars in the database', async () => {
        const res = await request(app)
            .get('/showAll');
        expect(res.statusCode).toEqual(200);
    });

    it('should delete a single car from the database', async () => {
        const res = await request(app)
            .delete('/delete')
            .query({ Make: 'Honda', Model: 'Civic', Year: '2020' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('The car has been successfully deleted');
    });
});

describe('Test carController', () => {
    it('should update the make of a single car in the database', async () => {
        const res = await request(app)
            .put('/updateMake')
            .query({ Make: 'Honda', Model: 'Civic', Year: '2020', NewMake: 'Toyota' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("The car's make has been successfully updated");
    });

    it('should update the model of a single car in the database', async () => {
        const res = await request(app)
            .put('/updateModel')
            .query({ Make: 'Honda', Model: 'Civic', Year: '2020', NewModel: 'Corolla' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("The car's model has been successfully updated");
    });
});

describe('Test carController', () => {
    it('should update the year of a single car in the database', async () => {
        const res = await request(app)
            .put('/updateYear')
            .query({ Make: 'Honda', Model: 'Civic', Year: '2020', NewYear: '2021' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual("The car's year has been successfully updated");
    });
});


