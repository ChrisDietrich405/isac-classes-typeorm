import { Router } from "express";
import UserController from "../controllers/userController";
// import Auth from "../middleware/auth"

const router = Router();

const controller = new UserController();

router.post("/register", controller.register);
router.post("/login", controller.login);
// router.get("/get-my-info", Auth.verifyToken, controller.getMyInfo);

export default router;
