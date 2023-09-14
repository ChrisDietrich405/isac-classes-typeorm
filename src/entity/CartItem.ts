import {
  OneToOne,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import User from "./User";
import Cart from "./Cart";
import Product from "./Product";

@Entity()
export default class CartItem {
  constructor(product: Product, amount: number) {
    this.amount = amount;
    this.product = product;
  }

  @PrimaryGeneratedColumn()
  id!: number;
  @Column({})
  amount: number;

  @OneToOne(() => Product)
  product: Product;

  @ManyToOne(() => Cart)
  cart?: Cart;
}
