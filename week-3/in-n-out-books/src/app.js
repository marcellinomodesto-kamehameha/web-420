/*
Author: Marcellino Modesto
Date: 06/21/2026
File: app.js
Description: Express server setup for the In-N-Out-Books API application.
*/

const express = require("express")

const app = express();

// GET route for landing page
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


        <nav>
            <a href="/">Home</a>
            <a href="#">Books</a>
            <a href="#">Collection</a>
        </nav>


        <main>

            <section>
                <h2>About In-N-Out-Books</h2>
                <p>
                    In-N-Out-Books is an API-driven application designed to help
                    readers organize and manage their personal book collections.
                    Users can keep track of books they own, discover epic new stories,
                    and maintain a digital library of their favorite titles.
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

// 404 Error Middleware
app.use((req, res) => {
    res.status(404).send({
        error: "Page not found"
    });
});

// 500 Error Middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message,
        stack: process.env.NODE_ENV === "development"
            ? err.stack
            : undefined
    });

});


// Export application
module.exports = app;