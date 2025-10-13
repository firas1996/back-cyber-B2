const express = require("express"); // Import the Express library
const { createUser } = require("../controllers/userController");
const router = express.Router(); // Create a new router object

router.post("/createuser", createUser); // Define a POST route for creating a user

module.exports = router; // Export the router to be used in other parts of the application
