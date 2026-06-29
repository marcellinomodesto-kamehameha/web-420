const request = require("supertest");
const app = require("../src/app");


describe("Chapter 4: API Tests", () => {


    test("Should return an array of books", async () => {

        const response = await request(app)
            .get("/api/books");


        expect(response.status).toEqual(200);

        expect(response.body)
            .toBeInstanceOf(Array);

    });



    test("Should return a single book", async () => {

        const response = await request(app)
            .get("/api/books/1");


        expect(response.status).toEqual(200);


        expect(response.body)
            .toHaveProperty("id", 1);

    });



    test("Should return a 400 error if id is not a number", async () => {

        const response = await request(app)
            .get("/api/books/test");


        expect(response.status).toEqual(400);


        expect(response.body)
            .toHaveProperty("message");

    });


});