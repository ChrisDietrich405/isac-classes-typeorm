//review errorHandler
//add isAdmin
//finish productController
//refresh tokens

import express from "express";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import cartRouter from "./routes/cartRoute";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import Auth from "./middleware/auth";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("success");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use(Auth.errorHandler);

app.listen(4000, () => {
  console.log("hello");
});
