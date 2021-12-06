import express from "express";

const user = express.Router();

user.post("/users", async () => {});

user.get("/users", async () => {});

user.get("/users/:userID", async () => {});

user.put("/users/:userID", async () => {});

user.delete("/users/:userID", async () => {});

export { user };
