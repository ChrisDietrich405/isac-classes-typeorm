import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../entity/User";
import Product from "../entity/Product";
import Cart from "../entity/Cart";

export default class cartController {
    async addProductToCart(req: Request, res: Response) {
        const { productId } = req.body;
    
        // if (!name || !price) {
        //   return res.status(400).json("bad request");
        // }
    
        try {
          const findUser = await AppDataSource.manager.findOneBy(User, {
            id: req.user,
          });
    
          if (!findUser) {
            return res.status(400).json("bad request");
          }
    
          const product = await AppDataSource.manager.findOneBy(Product, {
            id: productId,
          })

          const cart = new Cart(findUser)
          cart.addProduct(product!)
    
          await AppDataSource.manager.save(cart);
          return res.status(201).json("cart created");
        } catch (error) {
          console.log(error);
        }
      }
}