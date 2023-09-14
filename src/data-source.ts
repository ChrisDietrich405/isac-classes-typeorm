import { DataSource } from "typeorm";
import User from "./entity/User";
import Product from "./entity/Product";
import Cart from "./entity/Cart";
import CartItem from "./entity/CartItem";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "secret",
  database: "ecommerce",
  synchronize: true,
  logging: true,
  entities: [User, Product, Cart, CartItem],
  subscribers: [],
  migrations: [],
});
