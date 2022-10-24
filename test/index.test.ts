import { App } from "../src/app";
import request from 'supertest';

const app = new App(3000).app;

describe('GET /pets', () => {
    test('should respond status code 200', async () => {
        const response = await request(app).get('/pets').send();
        expect(response.statusCode).toBe(200);
    });

    test('should respond with an object', async () => {
        const response = await request(app).get('/pets').send();
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('GET /pet', () => {
    test('should respond status code 200', async () => {
        const response = await request(app).get('/pet').send();
        expect(response.statusCode).toBe(200);
    });

    test('should respond with an object', async () => {
        const response = await request(app).get('/pet').send();
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('POST /pet', () => {
    describe("Given a name and tag", () => {
        test('status code 201', async () => {
            const response = await request(app).post('/pet').send({
                name: "Oliver",
                tag: "Frech"
            });
            expect(response.statusCode).toBe(201);
        });
        test('content-type of application/json', async () => {
            const response = await request(app).post('/pet').send({
                name: "Polo",
                tag: "Cat"
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });
        test('json object containing the new pet with an id', async () => {
            const response = await request(app).post('/pet').send({
                name: "Peter",
                tag: "Cat"
            });
            expect(response.body.id).toBeDefined();
        });
        test('json object containing the new pet with a name', async () => {
            const response = await request(app).post('/pet').send({
                name: "Peter",
                tag: "Cat"
            });
            expect(response.body.name).toBeDefined();
        });
    });
    
    describe("Name or Tag missing", () => {
        test('Status code 400', async () => {
            const response = await request(app).post('/pet').send();
            expect(response.status).toBe(400);
        });
    });
});