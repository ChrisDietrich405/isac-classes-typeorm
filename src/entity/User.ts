import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Cart from "./Cart";

@Entity()
export default class User {
  constructor(name: string, email: string, password: string, isAdmin: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.carts = [];
  }
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  isAdmin: boolean;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[]; //to initialize it
}
