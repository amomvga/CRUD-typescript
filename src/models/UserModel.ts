import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const UserModel = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.VIRTUAL,
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
