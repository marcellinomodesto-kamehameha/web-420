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
        <html>
        <head>
            <title>In-N-Out-Books</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #8f6c49;
                    text-align: center;
                    padding: 50px;
                }

                h1 {
                    color: #333;
                }

                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: auto;
                }

                p {
                    font-size: 18px;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>Welcome to In-N-Out-Books</h1>
                <p>
                    Manage your personal book collection with ease.
                </p>

                <p>
                    Manage your collection of books
                    and discover new epic stories.
                </p>
            </div>
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