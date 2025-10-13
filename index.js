const express = require("express"); // Import the Express library
const mongoose = require("mongoose"); // Import the Mongoose library
const dotenv = require("dotenv"); // Import the dotenv library to manage environment variables
dotenv.config({ path: "./.env" }); // Load environment variables from .env file

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connection to database successful !!!");
  })
  .catch((e) => {
    console.log("Connection to database failed !!!" + e);
  });

const app = express(); // Create an Express application
const port = 1234; // Define the port number

app.listen(port, () => {
  console.log(`Server is running !!!`); // Log a message when the server starts
});
