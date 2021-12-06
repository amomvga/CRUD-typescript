import express from "express";
import SessionController from "../Controllers/SessionController";

const sessions = express.Router();

sessions.post("/sessions", SessionController.store);

export { sessions };
