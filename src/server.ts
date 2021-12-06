import express, { json } from "express";
import { db } from "./database/db";
import { user } from "./routes/User.routes";
import { sessions } from "./routes/Sessions.routes";

const app = express();

app.use(json());
app.use(user);
app.use(sessions);

app.listen(3333, async () => {
  await db.sync();
  console.log("Server is running at port 3333");
});
