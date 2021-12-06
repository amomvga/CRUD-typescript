import express from "express";
import UsersController from "../Controllers/UsersController";

const user = express.Router();

user.post("/users", UsersController.create);

user.get("/users", UsersController.findAll);

user.get("/users/:userID", UsersController.findOne);

user.put("/users/:userID", UsersController.update);

user.delete("/users/:userID", UsersController.destroy);

export { user };
