const express = require("express"); // Import the Express library
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const { signup } = require("../controllers/authController");
const router = express.Router(); // Create a new router object

router.route("/").post(createUser).get(getAllUsers);
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);
router.post("/signup", signup);

module.exports = router; // Export the router to be used in other parts of the application
