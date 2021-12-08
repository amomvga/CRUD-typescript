import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";

class UserController {
  async findAll(req: Request, res: Response) {
    const users = await UserModel.findAll();

    if (users.length > 0) {
      res.status(200).json(users);
    }
    res.status(204).send();
  }

  async findOne(req: Request, res: Response) {
    const { userID } = req.params;
    const user = await UserModel.findOne({
      where: {
        id: userID,
      },
    });
    if (user) {
      res.status(200).json(user);
    }
    res.status(204).send();
  }

  async create(req: Request, res: Response) {
    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, 8);
    const userExists = await UserModel.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await UserModel.create({
      email,
      name,
      passwordHash: hash,
    });
    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const { email, oldPassword, password } = req.body;
    const { userID } = req.params;
    const userId = await UserModel.findByPk(userID);

    if (email !== userId.getDataValue("email")) {
      const userExists = await UserModel.findOne({ where: { email: email } });
      if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    if (oldPassword) {
      const isValidPass: boolean = await bcrypt.compare(
        oldPassword,
        userId.getDataValue("passwordHash")
      );

      if (!isValidPass) {
        return res.status(401).json({ error: "Password does not match" });
      }
      const hash = await bcrypt.hash(password, 8);

      await UserModel.update(
        { passwordHash: hash },
        {
          where: { id: userID },
        }
      );
    }

    await UserModel.update(req.body, {
      where: { id: userID },
    });
    return res.json({ ok: true });
  }

  async destroy(req: Request, res: Response) {
    const { userID } = req.params;
    await UserModel.destroy({ where: { id: userID } });
    return res.status(204).send();
  }
}

export default new UserController();
