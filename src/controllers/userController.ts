import { Request, Response } from "express";
import User from "../entity/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password, isAdmin } = req.body;
    console.log(name);

    if (!name || !email || !password) {
      const error = new Error("Please add information");
      res.status(400).json({ error: error.message }); // Return error as JSON
    }

    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailFormat)) {
      const error = new Error("Invalid email format");
      res.status(400).json({ error: error.message });
    }

    try {
      const existingUser = await AppDataSource.manager.findOneBy(User, {
        email,
      });
      if (existingUser) {
        const error = new Error("user already exists");
        res.status(400).json({ error: error.message });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User(name, email, hashedPassword, isAdmin);

      await AppDataSource.manager.save(newUser);

      res.status(201).json("user registered");
    } catch (error) {
      res.status(500).json("server error");
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      const error = new Error("please add info");
      res.status(400).json({ error: error.message });
    }

    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailFormat)) {
      res.status(400);
      throw new Error("invalid");
    }

    const foundUser = await AppDataSource.manager.findOneBy(User, { email });

    if (!foundUser) {
      return res.status(403).json("wrong credentials");
    }

    const matchedPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchedPassword) {
      res.status(401).json("incorrect credentials");
    }

    res.status(200).json({
      token: jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      }),
    });
  }

  // async getMyInfo(req: Request, res: Response) {
  //   const id: number = req.user;
  //   const user = await AppDataSource.manager.findOneBy(User, { id });

  //   res.status(200).json({ user });
  // }
  //DON'T DO THIS IN REAL PROJECT
}
