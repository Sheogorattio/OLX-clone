import { Router } from "express";
import { TokenController } from "../controllers/token-controller.js";

export const tokenRoutes = Router();

tokenRoutes.route("/")
    .get(TokenController.getAll)
    .post(TokenController.create);
