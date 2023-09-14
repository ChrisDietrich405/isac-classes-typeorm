import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import Product from "./Product";
import User from "./User";
import CartItem from "./CartItem";

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  constructor(user: User) {
    this.user = user;
  }

  addProduct(product: Product) {
    const index = this.items?.findIndex(
      (item) => item.product.id === product.id
    );
    if (index && this.items && index >= 0) {
      const existingProduct = this.items[index];
      existingProduct.amount++;
      this.items[index] = existingProduct;
    } else {
      const item = new CartItem(product, 1);
      if(!this.items) {
        this.items = []
      }
      this.items.push(item);
    }
  }

  removeProduct(product: Product) {
    this.items = this.items?.filter((item) => item.product.id !== product.id);
  }

  totalCost() {
    return this.items!
      .map((item) => item.amount * item.product.price)
      .reduce((acc, curVal) => {
        return acc + curVal;
      }, 0);
  }

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartItem, (item) => item.cart)
  items?: CartItem[];
}
