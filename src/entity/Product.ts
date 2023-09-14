import { ManyToOne, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import User from "./User";
import Cart from "./Cart";

@Entity()
export default class Product {
  constructor(name: string, price: number, user: User) {
    this.name = name;
    this.price = price;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Cart)
  cart?: Cart;
}
