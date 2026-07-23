const express = require("express");

const router = express.Router();

const {
    createUser,
    getUsers,
    getUserById
} = require("../controllers/userController");


// Task 1 - Save User
router.post(
    "/",
    createUser
);


// Task 1 - Get All Users
router.get(
    "/",
    getUsers
);


// Task 2 - Get clicked user's details
router.get(
    "/:id",
    getUserById
);


module.exports = router;