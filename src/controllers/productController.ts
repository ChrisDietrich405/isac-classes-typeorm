import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../entity/User";
import Product from "../entity/Product";

export default class ProductController {
  async createProduct(req: Request, res: Response) {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json("bad request");
    }

    try {
      const findUser = await AppDataSource.manager.findOneBy(User, {
        id: req.user,
      });

      if (!findUser || !findUser.isAdmin) {
        return res.status(400).json("bad request");
      }

      const newProduct = new Product(name, price, findUser);

      await AppDataSource.manager.save(newProduct);
      return res.status(201).json("product created");
    } catch (error) {
      console.log(error);
    }
  }
}
