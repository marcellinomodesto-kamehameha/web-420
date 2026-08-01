/*
Author: Marcellino Modesto
Date: 06/21/2026
File: app.js
Description: Express server setup for the In-N-Out-Books API application.
*/

const express = require("express");
const books = require("../Database/books");
const users = require("../Database/users");
const bcrypt = require("bcryptjs");
const Ajv = require("ajv");
const ajv = new Ajv();

const app = express();

app.use(express.json());

/* HOME ROUTE */
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>In-N-Out-Books</title>

      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
          background-color: #986d52;
          color: #333;
        }

        header {
          background-color: #55402c;
          color: white;
          padding: 30px;
          text-align: center;
        }

        nav {
          background-color: #ffffff;
          padding: 10px;
          text-align: center;
        }

        nav a {
          color: #2c3e50;
          margin: 15px;
          text-decoration: none;
        }

        main {
          padding: 30px;
        }

        section {
          background-color: white;
          margin: 20px auto;
          padding: 20px;
          max-width: 900px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        h2 {
          color: #2c3e50;
        }

        footer {
          background-color: #2c3e50;
          color: white;
          text-align: center;
          padding: 15px;
        }

        ul {
          line-height: 1.8;
        }
      </style>
    </head>

    <body>
      <header>
        <h1>Welcome to In-N-Out-Books</h1>
        <p>A new and simple way to manage your book collection.</p>
      </header>

      <main>
        <section>
          <h2>About In-N-Out-Books</h2>
          <p>
            In-N-Out-Books is an API-driven application designed to help
            readers organize and manage their personal book collections.
          </p>
        </section>

        <section>
          <h2>Top Selling Books</h2>
          <ul>
            <li>Don Quixote - Miguel de Cervantes</li>
            <li>Harry Potter and the Sorcerer's Stone - J.K. Rowling</li>
            <li>The Hobbit - J.R.R. Tolkien</li>
            <li>Atomic Habits - James Clear</li>
          </ul>
        </section>

        <section>
          <h2>Hours of Operation</h2>
          <p>
            Monday - Friday: 9:00 AM - 9:00 PM<br>
            Saturday: 10:00 AM - 6:00 PM<br>
            Sunday: Closed
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>
            Email: support@innoutbooks.com<br>
            Phone: (555) 123-4567<br>
            Address: 123 Book Street, Library City
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 In-N-Out-Books. All Rights Reserved.</p>
      </footer>
    </body>
    </html>
  `);
});

/* GET ALL BOOKS*/
app.get("/api/books", async (req, res) => {
  try {
    const bookList = await books.find();
    res.status(200).send(bookList);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

/* GET BOOK BY ID*/
app.get("/api/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send({
        message: "ID must be a number"
      });
    }

    const book = await books.findOne({ id });

    res.status(200).send(book);

  } catch (err) {
    res.status(404).send({
      message: err.message
    });
  }
});

/* CREATE BOOK*/
app.post("/api/books", async (req, res) => {
  try {
    const { id, title, author } = req.body;

    if (!title) {
      return res.status(400).send({
        message: "Book title is required"
      });
    }

    const newBook = { id, title, author };

    await books.insertOne(newBook);

    res.status(201).send(newBook);

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

/* DELETE BOOK*/
app.delete("/api/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send({
        message: "ID must be a number"
      });
    }

    await books.deleteOne({ id });

    res.status(204).send();

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

/* UPDATE BOOK*/
app.put("/api/books/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send({
        message: "Input must be a number"
      });
    }

    const { title, author } = req.body;

    if (!title) {
      return res.status(400).send({
        message: "Bad Request"
      });
    }

    await books.updateOne(
      { id },
      {
        id,
        title,
        author
      }
    );

    res.status(204).send();

  } catch (err) {
  console.error(err);

  res.status(err.status || 500).send({
    message: err.message
    });
  }
});

/* LOGIN USER */
app.post ("/api/login", async (req, res) => {
  try {
    const {email, password} = req.body;

      if (!email||!password) {
        return res.status(400).send({
          message: "Bad Request"
        });
      }

     /* FIND USER BY EMAIL */
    const user = await users.findOne({ email });

    /* CHECK PASSWORD */
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }

    /* LOGIN SUCCESSFUL */
    res.status(200).send({
      message: "Authentication successful"
    });

  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message
    });
  }
});

/* VERIFY SECURITY QUESTIONS */
app.post("/api/users/:email/verify-security-question", async (req, res) => {
  try {

    /* AJV VALIDATION */
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          answer: { type: "string" }
        },
        required: ["answer"],
        additionalProperties: false
      }
    };

    const validate = ajv.compile(schema);

    if (!validate(req.body)) {
      return res.status(400).send({
        message: "Bad Request"
      });
    }

    /* FIND USER */
    const user = await users.findOne({
      email: req.params.email
    });

    if (!user) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }

    /* VERIFY SECURITY QUESTION ANSWERS */
    const isValid = req.body.every((question, index) => {
      return (
        user.securityQuestions[index] &&
        question.answer === user.securityQuestions[index].answer
      );
    });

    if (!isValid) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }

    res.status(200).send({
      message: "Security questions successfully answered"
    });

  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
});

/*404 HANDLER */
app.use((req, res) => {
  res.status(404).send({
    error: "Page not found"
  });
});

/*500 HANDLER*/
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

module.exports = app;