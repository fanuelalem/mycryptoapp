require("dotenv").config();
const express = require("express");
const auth = require("../../middleware/auth");
let router = express.Router();

const {
    UserController,
} = require('../../../cryptoChatWebAppApi/controllers');

module.exports = [
    //user routes
    router.post("/users", auth, UserController.save),
    router.get("/users", auth, UserController.getAll),
    router.get("/users/:userId", auth, UserController.get),
    router.patch("/users/:userId", auth, UserController.patch),
    router.delete("/users/:userId", auth, UserController.delete),

]