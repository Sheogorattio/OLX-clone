import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";

export const userRoutes = Router();

userRoutes.route("/")
.get(UserController.getAll);

userRoutes.route("/signup")
.post(UserController.create, UserController.saveUserToSession);

userRoutes.route("/signin")
.post(UserController.login, UserController.saveUserToSession);

userRoutes.route("/logout")
.post(UserController.logout);