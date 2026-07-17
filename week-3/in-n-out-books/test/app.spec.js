const request = require("supertest");
const app = require("../src/app");

describe("Chapter 3: API Tests", () => {

  /* GET ALL BOOKS */
  test("Should return an array of books", async () => {

    const response = await request(app)
      .get("/api/books");

    expect(response.status).toEqual(200);

    expect(response.body)
      .toBeInstanceOf(Array);

  });

  /* GET SINGLE BOOK */
  test("Should return a single book", async () => {

    const response = await request(app)
      .get("/api/books/1");

    expect(response.status).toEqual(200);

    expect(response.body)
      .toHaveProperty("id", 1);

  });

  /* INVALID ID TEST */
  test("Should return a 400 error if id is not a number", async () => {

    const response = await request(app)
      .get("/api/books/test");

    expect(response.status).toEqual(400);

    expect(response.body)
      .toHaveProperty("message");

  });

});

describe("Chapter 4: API Tests", () => {

  /* CREATE BOOK (POST) */
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

  /* RETURN MISSING TITLE */
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

  /* DELETE BOOK */
  test("Should return a 204-status code when deleting a book", async () => {

    const response = await request(app)
      .delete("/api/books/1");

    expect(response.status).toEqual(204);

  });

});

describe("Chapter 5: API Tests", () => {

  /* UPDATE BOOK */
  test("Should update a book and return 204-status code", async () => {

    const response = await request(app)
      .put("/api/books/2")
      .send({
        title: "Updated Book",
        author: "Updated Author"
      });

    expect(response.status).toEqual(204);

  });

  /* INVALID ID */
  test("Should return a 400-status code when using a non-numeric id", async () => {

    const response = await request(app)
      .put("/api/books/foo")
      .send({
        title: "Updated Book",
        author: "Updated Author"
      });

    expect(response.status).toEqual(400);

    expect(response.body)
      .toHaveProperty("message", "Input must be a number");

  });

  /* MISSING TITLE */
  test("Should return a 400-status code when updating a book with a missing title", async () => {

    const response = await request(app)
      .put("/api/books/2")
      .send({
        author: "Updated Author"
      });

    expect(response.status).toEqual(400);

    expect(response.body)
      .toHaveProperty("message", "Bad Request");

  });

});

describe("Chapter 6: API Tests", () => {

  /* LOGIN USER */
  test("Should log a user in and return a 200-status code", async () => {

    const response = await request(app)
      .post("/api/login")
      .send({
        email: "harry@hogwarts.edu",
        password: "potter"
      });

    expect(response.status).toEqual(200);

    expect(response.body)
      .toHaveProperty("message", "Authentication successful");

  });

  /* INVALID LOGIN */
  test("Should return a 401-status code when logging in with incorrect credentials", async () => {

    const response = await request(app)
      .post("/api/login")
      .send({
        email: "harry@hogwarts.edu",
        password: "wrongpassword"
      });

    expect(response.status).toEqual(401);

    expect(response.body)
      .toHaveProperty("message", "Unauthorized");

  });

  /* MISSING EMAIL OR PASSWORD */
  test("Should return a 400-status code when missing email or password", async () => {

    const response = await request(app)
      .post("/api/login")
      .send({
        email: "harry@hogwarts.edu"
      });

    expect(response.status).toEqual(400);

    expect(response.body)
      .toHaveProperty("message", "Bad Request");

  });

});