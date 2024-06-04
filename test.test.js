const supertest = require('supertest');
const app = require('./app.js');

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVkZGU1YTBlZjU1ZmE2YjVlMTM4YjQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTc1MDEwNDEsImV4cCI6MTcxNzUwNDY0MX0.lGVvkX2IUKPqVp9JP0egyN1PKRCdhCKdpdSCQy9MQB4"





describe("GET /api/parkings/getAlleParking", () => {
    test("should return all parkings", async () => {
        const response = await supertest(app).get('/api/parkings/getAlleParking');
        expect(response.statusCode).toBe(200);
    })
})

describe("GET /api/parkings/getParkingById", () => {
    test("should return parking by id", async () => {
        const response = await supertest(app).get('/api/parkings/getParkingById/664f6bf31a2815c6ee3f9840');
        expect(response.statusCode).toBe(200);
    })
})


describe("POST /api/parkings/voegParkingToe", () => {
    test("should return 401 because not authorized", async () => {
        
        const newParking = {
            name: "Parking Noord Station",
            stad: "664f6b801a2815c6ee3f9836",
            plaatsen: 10
        }

        const response = await supertest(app).post('/api/parkings/voegParkingToe').send(newParking);
        expect(response.statusCode).toBe(401);
    })
});

describe("POST /api/auth/authoriseer", () => {
    test("should return 200 because authorized", async () => {
        const user = {
            email: "igorisadmin@gmail.com",
            password: "Azerty-123"
        }
    
        const response = await supertest(app).post("/api/auth/authoriseer").send(user);
        token = response.headers['x-auth-token'];
        expect(response.statusCode).toBe(200);
    })
});

describe("POST /api/parkings/voegParkingToe", () => {
    test("should return 200 because authorized", async () => {

        const newParking = {
            name: "Parking Noord Station",
            stad: "664f6b801a2815c6ee3f9836",
            plaatsen: 10
        }

        const response = await supertest(app).post('/api/parkings/voegParkingToe').set('x-auth-token', token).send(newParking);
        expect(response.statusCode).toBe(200);
    })
});

describe("PUT /api/parkings/updateParking", () => {
    test("should return 401 because not authorized", async () => {
        const parking = {
            plaatsen: 500
        }

        const response = await supertest(app).put('/api/parkings/updateParkingById/665ee698cf64fe3cbe1759c4').send(parking);
        expect(response.statusCode).toBe(401);
    })
})

describe("PUT /api/parkings/updateParking", () => {
    test("should return 200 because authorized", async () => {
        const parking = {
            name: "Parking Noord Station",
            stad: "664f6b801a2815c6ee3f9836",
            plaatsen: 500
        }
        const response = await supertest(app).put('/api/parkings/updateParkingById/665ee698cf64fe3cbe1759c4').set('x-auth-token', token).send(parking);

        expect(response.statusCode).toBe(200);
    })
})

describe("DELETE /api/parkings/deleteParkingById", () => {
    test("should return 401 because not authorized", async () => {
        const response = await supertest(app).delete('/api/parkings/deleteParkingById/665ee698cf64fe3cbe1759c4');
        expect(response.statusCode).toBe(401);
    })
})

describe("DELETE /api/parkings/deleteParkingById", () => {
    test("should return 200 because authorized", async () => {
        const response = await supertest(app).delete('/api/parkings/deleteParkingById/665ee698cf64fe3cbe1759c4').set('x-auth-token', token);
        expect(response.statusCode).toBe(200);
    })
})

