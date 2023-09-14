import { Request, Response } from "express";
import { Router } from "express";
import ProductController from "../controllers/productController";
import Auth from "../middleware/auth";
const router = Router();

const controller = new ProductController();

// router.get("/", Auth.verifyToken, controller.getUserProducts);
router.post("/", Auth.verifyToken, controller.createProduct);

export default router;
