import { Router } from "express";
import CartController from "../controllers/cartController";
import Auth from "../middleware/auth";
const router = Router();

const controller = new CartController();

// router.get("/", Auth.verifyToken, controller.getUserProducts);
router.post("/", Auth.verifyToken, controller.addProductToCart);

export default router;
