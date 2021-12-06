import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";
import authConfig from "../config/auth";

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }

    const isValidPass = await bcrypt.compare(
      password,
      user.getDataValue("passwordHash")
    );

    if (!isValidPass) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, name }: any = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
