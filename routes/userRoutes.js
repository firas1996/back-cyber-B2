const express = require("express"); // Import the Express library
const { createUser, getAllUsers } = require("../controllers/userController");
const router = express.Router(); // Create a new router object

router.post("/createuser", createUser); // Define a POST route for creating a user
router.get("/getallusers", getAllUsers); // Define a GET route for retrieving all users

module.exports = router; // Export the router to be used in other parts of the application
