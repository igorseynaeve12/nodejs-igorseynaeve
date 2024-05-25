const supertest = require('supertest');
const app = require('./app.js');

describe("GET /api/parkings/getAlleParking", () => {
    test("should return all parkings", async () => {
        const response = await supertest(app).get('/api/parkings/getAlleParking');
        expect(response.statusCode).toBe(200);
    })
})
