const request = require("supertest");
const app = require("../src/app");

describe("Chapter 4: API Tests", () => {

  /* GET ALL BOOKS*/
  test("Should return an array of books", async () => {

    const response = await request(app)
      .get("/api/books");

    expect(response.status).toEqual(200);

    expect(response.body)
      .toBeInstanceOf(Array);

  });


  /* GET SINGLE BOOK*/
  test("Should return a single book", async () => {

    const response = await request(app)
      .get("/api/books/1");

    expect(response.status).toEqual(200);

    expect(response.body)
      .toHaveProperty("id", 1);

  });


  /* INVALID ID TEST*/
  test("Should return a 400 error if id is not a number", async () => {

    const response = await request(app)
      .get("/api/books/test");

    expect(response.status).toEqual(400);

    expect(response.body)
      .toHaveProperty("message");

  });


  /* CREATE BOOK (POST)*/
  test("Should return a 201-status code when adding a new book", async () => {

    const response = await request(app)
      .post("/api/books")
      .send({
        id: 10,
        title: "New Book",
        author: "Test Author"
      });

    expect(response.status).toBe(201);

    expect(response.body)
      .toHaveProperty("title", "New Book");

  });


  /* RETURN MISSING TITLE*/
  test("Should return a 400-status code when adding a new book with missing title", async () => {

    const response = await request(app)
      .post("/api/books")
      .send({
        id: 7,
        author: "Test Author"
      });

    expect(response.status).toEqual(400);

    expect(response.body)
      .toHaveProperty("message");

  });


  /* DELETE BOOK*/
  test("Should return a 204-status code when deleting a book", async () => {

    const response = await request(app)
      .delete("/api/books/1");

    expect(response.status).toEqual(204);

  });

});