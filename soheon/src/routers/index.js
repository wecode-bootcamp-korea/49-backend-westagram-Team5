const express = require("express");

const routers = express.Router();

const { userRouter } = require("./userRouter");

routers.use("/users", userRouter);

module.exports = { routers }